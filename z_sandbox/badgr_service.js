// Swagger docs for Badgr: https://api.badgr.io/docs/v2/
import _ from 'lodash';
import qs from 'qs';

import BadgeAssertion from 'efh-models/badge_assertion';
import BadgeClass from 'efh-models/badge_class';
import Course from 'efh-models/course';
import HttpService from 'efh-services/http_service';
import Program from 'efh-models/program';
import User from 'efh-models/user';

const ENABLE_LOGGING = false;
let BADGR_AUTH_TOKEN = null;


const makeBadgrRequest = HttpService.createThrottledRequest(process.env.NODE_ENV === 'test' ? 0 : 2000);

// NOTE: Only exporting this function for testing. It should not be used outside of this file otherwise.
export const determineProgramBadgesForCompletedCourses = async () => {
  // checks if a user has badges for all courses within a particular program
  // returns an array of new program badges to be issued
  const programsMap = await Program.aggregate([
    { $addFields: { convertedId: { $toString: '$_id' } } },
    { $lookup: { from: 'courses', localField: 'convertedId', foreignField: 'program_id', as: 'courses' } },
  ]);

  const users = await User.aggregate([
    { $lookup: { from: 'badge_assertions', localField: '_id', foreignField: 'user_id', as: 'badges' } },
  ]);

  console.log('Searching for new program badges...');

  const newProgramBadges = await users.reduce(async (lastUserPromise, user) => {
    const output = await lastUserPromise;
    const userLog = (...args) => console.log(`  [User ${user._id}]`, ...args);

    if (user.badges.length === 0) return Promise.resolve(output);

    if (ENABLE_LOGGING) console.log(`User ${user._id} (${user.email}) has ${user.badges.length} badge(s). Checking for new program badges...`);

    const { new: newUserBadges } = await user.badges.reduce(async (lastBadgePromise, badge) => {
      const userOutput = await lastBadgePromise;

      if (!badge.course_id) return userOutput; // Ignore badges w/o course_id (i.e., program badges)

      const course = await Course.findById(badge.course_id).exec();
      const program = programsMap.find(programSearch => String(programSearch._id) === String(course.program_id));

      if (ENABLE_LOGGING) userLog(`User has course badge ${badge._id} for course ${course.name} (${badge.course_id})...`);

      if (!program) {
        if (ENABLE_LOGGING) userLog(`No program found for course ${badge.course_id}. Skipping.`);

        return userOutput;
      }

      // Check for existing program badges (already in badgr)
      let userProgramBadge = userOutput.all.find(badgeSearch => _.get(badgeSearch, 'badgr_assertion.badgeclass') === program.badge_id);

      if (userProgramBadge) {
        if (ENABLE_LOGGING) userLog(`User has already been awarded program badge ${program.badge_id} for program ${program.name} (${program._id}). Skipping.`);
        // if (ENABLE_LOGGING) userLog('COURSE BADGE:\n', JSON.stringify(badge, null, 2));
        // if (ENABLE_LOGGING) userLog('PROGRAM BADGE:\n', JSON.stringify(userProgramBadge, null, 2));

        return userOutput;
      }

      // Check for newly added program badge to prevent duplicates
      userProgramBadge = userOutput.new.find(badgeSearch => badgeSearch.badgeId === program.badge_id);

      if (userProgramBadge) {
        if (ENABLE_LOGGING) userLog(`Already added program badge ${program.badge_id} for program ${program.name} (${program._id}). Skipping.`);
        // if (ENABLE_LOGGING) userLog('COURSE BADGE:\n', JSON.stringify(badge, null, 2));
        // if (ENABLE_LOGGING) userLog('PROGRAM BADGE:\n', JSON.stringify(userProgramBadge, null, 2));

        return userOutput;
      }

      if (ENABLE_LOGGING) userLog(`User has not yet been awarded program badge ${program.badge_id} for program ${program.name} (${program._id}). Checking completion status...`);
      // if (ENABLE_LOGGING) userLog(JSON.stringify(badge, null, 2));

      if (badge.badgr_assertion.badgeclass === process.env.LEN4_BADGE_CLASS) {
        // special case: to get General English program badge, user only needs the Learn English Now 4 course badge
        userLog(`...User will be awarded the 'General English' program badge (${process.env.LEN4_BADGE_CLASS}) b/c they've received the 'Learn English Now 4' course badge...`);
      } else {
        const hasAllCourseBadges = !program.courses.find(programCourse => !userOutput.all.find(userBadge => userBadge.badgr_assertion.badgeclass === programCourse.badge_id));

        if (ENABLE_LOGGING) userLog(`...User has ${hasAllCourseBadges ? '' : 'not '}completed all of the courses for program ${program.name} (${program._id}).${hasAllCourseBadges ? ' Adding badge...' : ''}`);

        if (!hasAllCourseBadges) return userOutput;
      }

      userLog(`...Awarding program badge ${program.badge_id} for program ${program.name} (${program._id}) to user ${user._id} (${user.email}).`);

      const newBadge = {
        badgeId: program.badge_id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      return {
        all: [...userOutput.all, newBadge],
        new: [...userOutput.new, newBadge],
      };
    }, Promise.resolve({ all: [...user.badges], new: [] }));

    if (ENABLE_LOGGING || newUserBadges.length) console.log(`...User ${user._id} (${user.email}) has earned ${newUserBadges.length} new badge(s): ${_.map(newUserBadges, 'badgeId').join(', ') || '--'}.`);

    return output.concat(newUserBadges);
  }, Promise.resolve([]));

  console.log(`...Found ${newProgramBadges.length} new program badges(s) for ${_.uniqBy(newProgramBadges, 'email').length} user(s).`);

  return newProgramBadges;
};

const BadgrService = {
  updateAuthToken() {
    return makeBadgrRequest({
      data: qs.stringify({
        username: process.env.BADGR_USERNAME,
        password: process.env.BADGR_PASSWORD,
      }),
      method: 'post',
      url: 'https://api.badgr.io/o/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(body => body.access_token)
      .catch(() => Promise.reject('Failed to retrieve auth token'));
  },
  async getAllBadges() {
    console.log('>>>> Pre getAllBadges: ', BADGR_AUTH_TOKEN)
    const token = BADGR_AUTH_TOKEN || await BadgrService.setBadgrAuthToken();
    console.log('<<<< Post getAllBadges: ', BADGR_AUTH_TOKEN)
    console.log('Badgr Auth Token (getAllBadges): ', token);


    return makeBadgrRequest({
      method: 'get',
      url: 'https://api.badgr.io/v2/badgeclasses',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => Promise.resolve(data.result.map(badge => ({ badgr_entity_id: badge.entityId, image: badge.image }))));
  },
  async getAllAssertions() {
    const token = BADGR_AUTH_TOKEN || await BadgrService.setBadgrAuthToken();

    console.log('Badgr Auth Token (getAllAssertions): ', token);


    return makeBadgrRequest({
      method: 'get',
      url: `https://api.badgr.io/v2/issuers/${process.env.BADGR_ISSUER_ID}/assertions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => Promise.resolve(data.result));
  },
  async saveAssertions(assertions) {
    // validate / format assertion data
    const ops = await assertions.reduce(async (prevStepPromise, assertion) => {
      const out = await prevStepPromise;
      const userId = await BadgrService.findUserForAssertion(assertion);

      if (!userId) return out;

      const courseOrProgramId = await BadgrService.findCourseOrProgramForAssertion(assertion);

      if (!courseOrProgramId) return out;

      return out.concat({
        updateOne: {
          filter: {
            user_id: userId,
            'badgr_assertion.badgeclass': assertion.badgeclass,
          },
          update: {
            $set: {
              user_id: userId,
              course_id: courseOrProgramId.courseId,
              program_id: courseOrProgramId.programId,
              badgr_assertion: assertion,
            },
          },
          upsert: true, // if no match, insert new
        },
      });
    }, Promise.resolve([]));

    if (ops.length === 0) return;

    console.log(`Upserting ${ops.length} assertion(s)...`);

    return BadgeAssertion.bulkWrite(ops)
      .then(() => console.log(`Upserted ${ops.length} assertion(s) OK!`))
      .catch((err) => {
        console.log('Error upserting assertion(s)', err);

        return Promise.reject(err);
      });
  },
  async updateBadgeEmails(user, newEmail) {
    const userAssertions = await BadgrService.findAssertionsForUser(user);

    return userAssertions.reduce(async (prevStepPromise, badgeData) => {
      const errors = await prevStepPromise;
      const badgeId = badgeData.badgeclass;

      return BadgrService.updateBadge({ email: newEmail, firstname: user.firstname, lastname: user.lastname }, badgeData.badgr_assertion.entityId)
        .then(() => Promise.resolve(errors.concat({ badgeId, email: newEmail, isValid: true })))
        .catch(err => Promise.resolve(errors.concat({ badgeId, email: newEmail, isValid: false, error: err || 'Error' })));
    }, Promise.resolve([]));
  },
  // Note: do not use postBadges method for any new code
  async postBadges(badges) {
    if (!badges || badges.length === 0) return null;

    // Badges contain user email and badgeId
    // Assertions contain assertion.badgr_assertion.recipient.plaintextIdentity (email) & badgr_assertion.entity (badgeId)
    const existingAssertions = await BadgeAssertion.find({});
    const validatedBadges = badges.map((badge) => {
      // if badges includes an object containing a matching badgeId and email add flag to ignore it & skip post call
      // We still want it in the list though
      const previouslyGranted = BadgrService.hasBadge(badge.email, badge.badgeId, existingAssertions);

      return {
        ...badge,
        previouslyGranted,
      };
    });

    return validatedBadges.reduce(async (prevStepPromise, { badgeId, email, previouslyGranted }) => {
      const errors = await prevStepPromise;

      if (previouslyGranted) {
        return Promise.resolve(errors.concat({ badgeId, email, isValid: true }));
      }

      const user = await User.findOne({ email }).exec();

      if (!user) {
        const err = `User not found for email '${email}'. Cannot award badge ${badgeId}!`;

        console.log(err);

        return Promise.resolve(errors.concat({ badgeId, email, isValid: false, error: err }));
      }

      return BadgrService.awardBadge(user, badgeId)
        .then(() => Promise.resolve(errors.concat({ badgeId, email, isValid: true })))
        .catch(err => Promise.resolve(errors.concat({ badgeId, email, isValid: false, error: err || 'Error' })));
    }, Promise.resolve([]));
  },
  findAssertionsForUser(user) {
    // return BadgeAssertion.find({ user_id: mongoose.Types.ObjectId(user._id) }).exec();
    return BadgeAssertion.find({ user_id: user._id }).exec();
  },
  findUserForAssertion(assertion) {
    return User.findOne({ email: assertion.recipient.plaintextIdentity }).exec();
  },
  async findCourseOrProgramForAssertion(assertion) {
    const badgeId = assertion.badgeclass;

    if (!badgeId) return null;

    const course = await Course.findOne({ badge_id: badgeId }).exec();

    if (course) return { courseId: course._id };

    const program = await Program.findOne({ badge_id: badgeId }).exec();

    if (program) return { programId: program._id };

    return null;
  },
  syncBadgeClasses() {
    // mainly used to save a Badge image
    // get data from Badgr
    return BadgrService.getAllBadges()
      .then((classes) => {
        // prepare data
        const documents = classes.map(badge => new BadgeClass({ image: badge.image, badgr_entity_id: badge.badgr_entity_id }));

        // wipe away current badges classes
        return BadgeClass.deleteMany({}).then(() => BadgeClass.insertMany(documents));
      })
      .then(() => ({
        status: 'success',
        message: '',
      }))
      .catch(err => ({
        status: 'failure',
        message: err.message,
      }));
  },
  // NOT USED
  async syncBadgeAssertions() {

    // Used to update (overwrite) badge assertions in our db with data from Badgr
    return BadgrService.getAllAssertions()
      // Since badgr is the soure of truth, no reason four our db to have any other assertions saved
      .then((assertions) => {
        return BadgeAssertion.deleteMany({}).exec()
          .then(() => BadgrService.saveAssertions(assertions));
      })
      .then(BadgrService.awardBadgesForPrograms)
      .then(() => ({
        status: 'success',
        message: '',
      }))
      .catch(err => ({
        status: 'failure',
        message: err.message,
      }));
  },
  // v2
  // Note: Does not check whether or not badge has already been granted and/or saved
  async awardBadge({ email, firstname, lastname }, badgeId) {
    if (!email || !badgeId) throw new Error('Email and badge ID are required to issue a badge.');

    console.log('>>>> Pre awardBadge: ', BADGR_AUTH_TOKEN)
    const token = BADGR_AUTH_TOKEN || await BadgrService.setBadgrAuthToken();
    console.log('<<<< Post awardBadge: ', BADGR_AUTH_TOKEN)
    console.log('token == BADGR_AUTH_TOKEN? ', token == BADGR_AUTH_TOKEN)

    console.log('Badgr Auth Token (award Badge): ', token);

    return makeBadgrRequest({
      url: `https://api.badgr.io/v2/badgeclasses/${badgeId}/assertions`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        recipient: {
          identity: email,
          type: 'email',
          hashed: true,
          plaintextIdentity: email,
        },
        extensions: {
          'extensions:recipientProfile': {
            '@context':'https://openbadgespec.org/extensions/recipientProfile/context.json',
            type: ['Extension', 'extensions:RecipientProfile'],
            name: `${firstname || ''} ${lastname || ''}`,
          },
        },
      },
    }, { verboseLogging: true })
      .then(data => BadgrService.saveAssertions(data.result));
  },
  async awardBadgesForCourses(user, courses) {
    const log = (...args) => console.log('[AWARD BADGES FOR COURSES]', ...args);

    if (ENABLE_LOGGING) log(`Checking ${courses.length} course(s) for new badges for user ${user._id} (${user.email})...`);

    const userBadges = await BadgeAssertion.find({ user_id: user._id }).exec();
    const userAssertionIds = _.compact(userBadges.map(badge => badge.badgr_assertion.badgeclass));
    const courseAssertionIds = _.compact(courses.map(course => course.badge_id));
    const newUserAssertionIds = _.difference(courseAssertionIds, userAssertionIds);

    // console.log(
    //   '+++++++++++++++++++++++++++++++++++++++++++++++++\n',
    //   'OLD:      ', userAssertionIds,
    //   '+++++++++++++++++++++++++++++++++++++++++++++++++\n',
    //   'COMPLETED:', courseAssertionIds,
    //   '+++++++++++++++++++++++++++++++++++++++++++++++++\n',
    //   '>>> NEW:  ', newUserAssertionIds,
    //   '\n+++++++++++++++++++++++++++++++++++++++++++++++++',
    // );

    if (newUserAssertionIds.length > 0) {
      if (ENABLE_LOGGING) log(`... User ${user._id} (${user.email}) has earned ${newUserAssertionIds.length} new badge(s). Notifying Badgr...`);
    } else if (ENABLE_LOGGING) {
      log(`... User ${user._id} (${user.email}) has not earned any new badges.`);
    }

    return newUserAssertionIds.reduce(async (prevStepPromise, badgeId) => {
      const errors = await prevStepPromise;

      return BadgrService.awardBadge(user, badgeId)
        .then(() => Promise.resolve(errors.concat({ badgeId, email: user.email, isValid: true })))
        .catch(err => Promise.resolve(errors.concat({ badgeId, email: user.email, isValid: false, error: err || 'Error' })));
    }, Promise.resolve([]))
      .then((res) => {
        const hasError = res.some(item => !item.isValid);

        if (hasError) {
          log(`... Error adding ${newUserAssertionIds.length} new course badge(s) for user ${user._id} (${user.email}).`, res);
        } else if (ENABLE_LOGGING) {
          log(`... Added ${newUserAssertionIds.length} new course badge(s) for user ${user._id} (${user.email}) OK!`);
        }

        return Promise.resolve(res);
      })
      .catch((err) => {
        log(`... Unknown error adding ${newUserAssertionIds.length} new course badge(s) for user ${user._id} (${user.email}).`, err);

        return Promise.reject(err);
      });
  },
  async awardBadgesForPrograms() {
    // set badgr auth token 1x per day
    BadgrService.setBadgrAuthToken()
    console.log('Set BADGR AUTH TOKEN 1x per day: ', BADGR_AUTH_TOKEN)

    const log = (...args) => console.log('[AWARD BADGES FOR PROGRAMS]', ...args);
    const newProgramBadges = await determineProgramBadgesForCompletedCourses();

    return newProgramBadges.reduce(async (prevStepPromise, { badgeId, ...user }) => {
      const errors = await prevStepPromise;

      return BadgrService.awardBadge(user, badgeId)
        .then(() => Promise.resolve(errors.concat({ badgeId, email: user.email, isValid: true })))
        .catch(err => Promise.resolve(errors.concat({ badgeId, email: user.email, isValid: false, error: err || 'Error' })));
    }, Promise.resolve([]))
      .then((res) => {
        const hasError = res.some(item => !item.isValid);

        if (hasError) {
          log(`... Error adding ${newProgramBadges.length} new program badge(s).`, res);
        } else if (ENABLE_LOGGING) {
          log(`... Added ${newProgramBadges.length} new program badge(s) OK!`);
        }

        return Promise.resolve(res);
      })
      .catch((err) => {
        log(`... Unknown error adding ${newProgramBadges.length} new program badge(s).`, err);

        return Promise.reject(err);
      });
  },
  async updateBadge({ email, firstname, lastname }, badgeAssertionEntityId) {
    if (!email || !badgeAssertionEntityId) throw new Error('Email and badge ID are required to update a badge.');

    const token = BADGR_AUTH_TOKEN || await BadgrService.setBadgrAuthToken();

    console.log('Badgr Auth Token (updateBadge): ', token);


    return makeBadgrRequest({
      url: `https://api.badgr.io/v2/assertions/${badgeAssertionEntityId}`,
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        recipient: {
          identity: email,
          type: 'email',
          hashed: true,
          plaintextIdentity: email,
        },
        extensions: {
          'extensions:recipientProfile': {
            '@context':'https://openbadgespec.org/extensions/recipientProfile/context.json',
            type: ['Extension', 'extensions:RecipientProfile'],
            name: `${firstname || ''} ${lastname || ''}`,
          },
        },
      },
    }, { verboseLogging: true })
      .then(data => BadgrService.saveAssertions(data.result));
  },
  hasBadge(email, badgeId, badgeAssertionArr) {
    return (badgeAssertionArr || []).some(({ badgr_assertion: { recipient, badgeclass } }) => (recipient.plaintextIdentity === email) && (badgeclass === badgeId));
  },
  async setBadgrAuthToken() {
    BADGR_AUTH_TOKEN = await BadgrService.updateAuthToken();
    console.log('Badge Set to: ', BADGR_AUTH_TOKEN)
    return BADGR_AUTH_TOKEN
  }
};

export default BadgrService;
