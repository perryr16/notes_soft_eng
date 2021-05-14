import 'core-js';
import 'regenerator-runtime/runtime';
import mongoose from 'mongoose';
import moment from 'moment';
import puppeteer from 'puppeteer';

import BadgeAssertion from 'efh-models/badge_assertion';
import Program from 'efh-models/program';
import User from 'efh-models/user';
import { start, stop, mock } from 'efh-test-server';

const pass = 'abcdef';
const imageUrl = 'https://media.badgr.io/uploads/badges/assertion-JaV-LGNOR8GKCtopiK-xTQ.png';
const dummyId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

const user1 = new User({
  firstname: 'Test',
  lastname: 'User',
  email: 'testuser1@aoltest.com',
  password: pass,
  step: 4,
});

const user2 = new User({
  firstname: 'Test',
  lastname: 'User',
  email: 'testuser2@aoltest.com',
  password: pass,
  step: 4,
});

const user3 = new User({
  firstname: 'Test',
  lastname: 'User',
  email: 'testuser3@aoltest.com',
  password: pass,
  step: 4,
});

const user4 = new User({
  firstname: 'Test',
  lastname: 'User',
  email: 'testuser4@aoltest.com',
  password: pass,
  step: 4,
});

// user1 has some course and some program badges
const programBadge1 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user1.id),
  badgr_assertion: {
    image: imageUrl,
    openBadgeId: 'https://api.badgr.io/public/assertions/JaV-LGNOR8GKCtopiK-xTQ',
    recipient: {
      plaintextIdentity: user1.email,
    },
    entityId: 'JaV-LGNOR8GKCtopiK-xTQ',
    issuedOn: '2022-12-31T16:57:02.523147Z',
  },
  program_id: dummyId,
});

const program1 = new Program({
  _id: dummyId,
  name: 'Test program 1',
  description: 'Test program 1',
  tag: '123456',
});

const programBadge2 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user1.id),
  badgr_assertion: {
    image: imageUrl,
  },
  program_id: dummyId,
});

const courseBadge1 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user1.id),
  badgr_assertion: {
    image: imageUrl,
  },
  course_id: dummyId,
});

const courseBadge2 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user1.id),
  badgr_assertion: {
    image: imageUrl,
  },
  course_id: dummyId,
});

const courseBadge3 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user1.id),
  badgr_assertion: {
    image: imageUrl,
  },
  course_id: dummyId,
});

// user2 has only course badges
const courseBadge4 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user2.id),
  badgr_assertion: {
    image: imageUrl,
  },
  course_id: dummyId,
});

const courseBadge5 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user2.id),
  badgr_assertion: {
    image: imageUrl,
  },
  course_id: dummyId,
});

// user3 has only program badges
const programBadge3 = new BadgeAssertion({
  user_id: mongoose.Types.ObjectId(user3.id),
  badgr_assertion: {
    image: imageUrl,
  },
  program_id: dummyId,
});

// user4 has no badges

beforeAll(async () => {
  await start();
  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();
  await programBadge1.save();
  await program1.save();
  await programBadge2.save();
  await programBadge3.save();
  await courseBadge1.save();
  await courseBadge2.save();
  await courseBadge3.save();
  await courseBadge4.save();
  await courseBadge5.save();
});

afterAll(stop);

describe('Dashboard Badges', () => {
  const url = `${process.env.HOSTNAME}:${process.env.CLIENT_PORT}/login`;
  const badgeCertUrl = `${process.env.HOSTNAME}:${process.env.CLIENT_PORT}/badge-certificate/${programBadge1.badgr_assertion.entityId}`;

  test("All of a users badges are displayed, but not other user's badges", async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user1.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card');

        const allBadges = await page.$$('.badge-card');

        expect(allBadges).toHaveLength(5);

        const courseBadges = await page.$$('.course-badges-list .badge-card');

        expect(courseBadges).toHaveLength(3);

        return browser.close();
      });
  });

  test('If a user has no program badges, a message is displayed', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user2.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card');

        const allBadges = await page.$$('.badge-card');

        expect(allBadges).toHaveLength(2);

        const courseBadges = await page.$$('.course-badges-list .badge-card');

        expect(courseBadges).toHaveLength(2);

        const noProgramBadgesText = await page.$('.badges-list p')
          .then(element => element.getProperty('innerHTML'))
          .then(text => text.jsonValue());

        expect(noProgramBadgesText).toBe("You haven't earned any program badges yet.");

        return browser.close();
      });
  });

  test('If a user has no course badges, a message is displayed', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user3.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card');

        const allBadges = await page.$$('.badge-card');

        expect(allBadges).toHaveLength(1);

        const courseBadges = await page.$$('.course-badges-list .badge-card');

        expect(courseBadges).toHaveLength(0);

        const noProgramBadgesText = await page.$('.course-badges-list p')
          .then(element => element.getProperty('innerHTML'))
          .then(text => text.jsonValue());

        expect(noProgramBadgesText).toBe("You haven't earned any course badges yet.");

        return browser.close();
      });
  });

  test('If a user has no badges at all, a message is displayed', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user4.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitFor(500);

        const allBadges = await page.$$('.badge-card');

        expect(allBadges).toHaveLength(0);

        const courseBadges = await page.$$('.course-badges-list .badge-card');

        expect(courseBadges).toHaveLength(0);

        const noBadgesMessage = await page.$$('.no-badges-header');

        expect(noBadgesMessage).toHaveLength(1);

        return browser.close();
      });
  });

  test('Displays correct program badge image for user', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user1.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card--image');

        const badgeImage = await page.$('.badge-card--image')
          .then(element => element.getProperty('src'))
          .then(text => text.jsonValue());

        expect(badgeImage).toBe(programBadge1.badgr_assertion.image);

        return browser.close();
      });
  });

  test('Share badge modal opens and user can open badge in a new tab', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user1.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card');
        await page.click('.programs .badge-card:first-child .share-badge-button');
        await page.waitFor(500);

        // await page.waitForSelector('.modal-button2');
        const link = programBadge1.badgr_assertion.openBadgeId;
        const email = encodeURIComponent(user1.email);
        const linkWithQueryParam = `${link}?identity__email=${email}`;
        const badgeUrlFromModal = await page.$('.modal-link')
          .then(element => element.getProperty('value'))
          .then(text => text.jsonValue());

        expect(badgeUrlFromModal).toBe(linkWithQueryParam);

        const badgeUrlFromButton = await page.$('.modal-button2')
          .then(element => element.getProperty('href'))
          .then(text => text.jsonValue());

        expect(badgeUrlFromButton).toBe(linkWithQueryParam);
      });
  });

  test('Email to myself button sends an email', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user1.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card');
        await page.click('.programs .badge-card:first-of-type .email-badge-button');
        await page.waitFor(1000);
        await page.waitForSelector('.badge-card .status');

        const emailStatus = await page.$('.badge-card .status span')
          .then(element => element.getProperty('innerHTML'))
          .then(text => text.jsonValue());
        const sentMail = mock.mock.getSentMail();

        expect(emailStatus).toBe('Email Sent!');
        expect(sentMail).toHaveLength(1);
      });
  });

  test('Badge certificate link works, even when user isnt logged in', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(badgeCertUrl)
      .then(async () => { // Badge Cert
        await page.waitForSelector('#Badge-Certificate');

        const recipientName = await page.$('text.st4.st5')
          .then(element => element.getProperty('innerHTML'))
          .then(text => text.jsonValue());
        const issuedOn = await page.$('text.st1.st3')
          .then(element => element.getProperty('innerHTML'))
          .then(text => text.jsonValue());
        const programName = await page.$('text.st4.st6')
          .then(element => element.getProperty('innerHTML'))
          .then(text => text.jsonValue());
        const parsedDate = moment(programBadge1.badgr_assertion.issuedOn).format('[Awarded this ]Do [Day of] MMMM[,] YYYY');

        expect(issuedOn).toBe(parsedDate);
        expect(recipientName).toBe(`${user1.firstname} ${user1.lastname}`);
        expect(programName).toBe(program1.name);

        return browser.close();
      });
  });

  test('Clicking on the \'Print Certificate button\' opens a new tab with the badge certificate', async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    return page.goto(url)
      .then(async () => { // login
        await page.type('#email', user1.email);
        await page.type('#password', pass);

        return page.click('#submit');
      })
      .then(async () => { // My Badges
        await page.waitForSelector('.my-badges');
        await page.click('.my-badges');
        await page.waitForSelector('.badge-card');

        const linkRef = await page.$('.badge-card a')
          .then(element => element.getProperty('href'))
          .then(text => text.jsonValue());

        await page.click('.badge-card a');
        await page.waitFor(1000);

        const pages = await browser.pages();

        expect(linkRef).toBe(badgeCertUrl);
        expect(pages).toHaveLength(3);

        return browser.close();
      });
  });
});
