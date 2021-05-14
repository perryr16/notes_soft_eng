import { scheduleTask } from 'cronosjs';

import BadgrService from 'efh-services/badgr_service';
import CanvasService from 'efh-services/canvas_service';
import CourseService from 'efh-services/course_service';
import EfSetService from 'efh-services/efset_service';
import EnrollmentService from 'efh-services/enrollment_service';

class Cron {
  constructor({ cron, env, run, log }) {
    if (!cron || !env || !log || !run) throw new Error('Invalid configuration');

    this.cron = cron;
    this.env = env;
    this.log = (...args) => console.log(`[${new Date().toISOString()} ${log}]`, ...args);
    this.run = run;

    this.isRunning = false;
  }

  get isEnabled() {
    return process.env[this.env] === 'true';
  }

  init() {
    if (!this.isEnabled) return this.log('DISABLED!');

    this.log(`Enabling cron @ '${this.cron}'.`);

    scheduleTask(this.cron, () => {
      if (this.isRunning) return this.log('Process is already running.');

      this.isRunning = true;
      this.start = Date.now();

      this.log('*** Running...');

      this.run()
        .then(() => {
          this.log(`*** Completed OK in ${(Date.now() - this.start) / 1000}s!`);
        })
        .catch((err) => {
          this.log(`*** Completed with ERROR in ${(Date.now() - this.start) / 1000}s!`, err);
        })
        .finally(() => {
          this.isRunning = false;
        });
    });
  }
}

const cronBadgrAssertions = new Cron({
  // Note: This cron is disabled
  cron: '0 0 * * *',
  env: 'ENABLE_BADGR_CRON',
  log: 'SYNC BADGR BADGE ASSERTIONS',
  run: BadgrService.syncBadgeAssertions,
});

const cronBadgrClasses = new Cron({
  cron: '*/15 * * * *',
  env: 'ENABLE_BADGR_CRON',
  log: 'SYNC BADGR BADGE CLASSES',
  run: BadgrService.syncBadgeClasses,
});

const cronBadgrProgramBadges = new Cron({
  cron: '0 0 * * *',
  env: 'ENABLE_BADGR_CRON',
  log: 'SYNC PROGRAM BADGES',
  run: BadgrService.awardBadgesForPrograms,
});

const cronCanvasCourses = new Cron({
  cron: '*/15 * * * *',
  env: 'ENABLE_CANVAS_CRON',
  log: 'SYNC CANVAS COURSES',
  run: CourseService.syncCanvas,
});

const cronCanvasEnrollments = new Cron({
  // cron: '*/15 * * * *',
  cron: '0 * * * *',
  env: 'ENABLE_CANVAS_CRON',
  log: 'SYNC CANVAS SCORES',
  run: EnrollmentService.syncCanvas,
});

const cronEdxCourses = new Cron({
  cron: '*/15 * * * *',
  env: 'ENABLE_EDX_CRON',
  log: 'SYNC EDX COURSES',
  run: CourseService.syncEdx,
});

const cronEdxEnrollments = new Cron({
  // cron: '*/15 * * * *',
  cron: '0 * * * *',
  env: 'ENABLE_EDX_CRON',
  log: 'SYNC EDX SCORES',
  run: EnrollmentService.syncEdx,
});

const cronEfSetScores = new Cron({
  cron: '*/1 * * * *',
  env: 'ENABLE_EFSET_CRON',
  log: 'SYNC EF SET SCORES',
  run: EfSetService.sync,
});

const cronCanvasSetToken = new Cron({
  cron: '*/50 * * * *',
  env: 'ENABLE_CANVAS_CRON',
  log: 'SET CANVAS AUTH TOKEN',
  run: CanvasService.setAuthToken,
});

// eslint-disable-next-line import/prefer-default-export
export function init() {
  // NOTE 12/20/20: This cron doesn't seem necessary now that the logic has been refactored
  if (false) cronBadgrAssertions.init();

  cronBadgrClasses.init();
  cronBadgrProgramBadges.init();
  cronCanvasCourses.init();
  cronCanvasEnrollments.init();
  cronEdxCourses.init();
  cronEdxEnrollments.init();
  cronEfSetScores.init();
  cronCanvasSetToken.init();
}
