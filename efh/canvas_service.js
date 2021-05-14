import _ from 'lodash';
import FormData from 'form-data';

import HttpService from 'efh-services/http_service';
import { normalizeUrl } from 'efh-helpers/url';

const CANVAS_CLIENT_ID = process.env.CANVAS_CLIENT_ID;
const CANVAS_CLIENT_SECRET = process.env.CANVAS_CLIENT_SECRET;
const CANVAS_URL_COURSE = normalizeUrl(process.env.CANVAS_URL_COURSE);
const CANVAS_URL_ENROLL = normalizeUrl(process.env.CANVAS_URL_ENROLL);
const CANVAS_URL_ENROLLMENTS = normalizeUrl(process.env.CANVAS_URL_ENROLLMENTS);
const CANVAS_URL_TOKEN = normalizeUrl(process.env.CANVAS_URL_TOKEN);

const makeCanvasRequest = HttpService.createThrottledRequest(process.env.NODE_ENV === 'test' ? 0 : 1000);

let CANVAS_AUTH_TOKEN = null;

export const getCustomerId = (user) => {
  if (!user.canvasId) throw new Error('User ID required');

  return user.canvasId;
};

const CanvasService = {
  getToken() {
    const data = new FormData();

    data.append('grant_type', 'client_credentials');
    data.append('client_id', CANVAS_CLIENT_ID || '');
    data.append('client_secret', CANVAS_CLIENT_SECRET || '');

    return makeCanvasRequest({
      data,
      method: 'post',
      url: CANVAS_URL_TOKEN,
      headers: {
        ...data.getHeaders(),
      },
    })
      .then(body => Promise.resolve(body.access_token));
  },
  async getCourses() {
    const token = CANVAS_AUTH_TOKEN || await CanvasService.setCanvasAuthToken();

    const makeRequest = (requestOptions) => {
      let responseArray = [];

      const getPage = (opts) => {
        return makeCanvasRequest(opts, { retryMax: 5 })
          .then((data) => {
            const next = _.get(data, 'links.next.href');
            const courses = (data.data || []).map(datum => ({ ...datum, included: data.included })); // Attach data.included (for image, etc.)

            responseArray = responseArray.concat(courses);

            return next
              ? getPage({ ...opts, url: next })
              : Promise.resolve(responseArray);
          });
      };

      return getPage(requestOptions);
    };

    return makeRequest({
      method: 'get',
      url: CANVAS_URL_COURSE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async getUserEnrollments(user) {
  // async getUserEnrollments(user, token) {
    if (!user) return Promise.reject('User required');

    const token = CANVAS_AUTH_TOKEN || await CanvasService.setCanvasAuthToken();

    return makeCanvasRequest({
      method: 'get',
      url: `${CANVAS_URL_ENROLLMENTS}/${encodeURI(getCustomerId(user))}`,
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${token || await CanvasService.getToken()}`,
      },
    }, { ignoreStatus: [404] })
      .then((data) => {
        // console.log('USER ENROLLMENT DATA:', data);

        return Promise.resolve(_.map(data.courses, (enrollment, canvasCourseId) => ({ ...enrollment, course_id: canvasCourseId })));
      });
  },
  async enrollUser(user, canvasCourseId) {
  // async enrollUser(user, canvasCourseId, token) {
    if (!user) return Promise.reject('User required');

    if (!canvasCourseId) return Promise.reject('Canvas course id required');

    const token = CANVAS_AUTH_TOKEN || await CanvasService.setCanvasAuthToken();

    return makeCanvasRequest({
      method: 'post',
      url: CANVAS_URL_ENROLL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        course_id: canvasCourseId,
        first_name: user.firstname,
        last_name: user.lastname,
        email_address: user.email,
        lead_class: 'CORP',
        sub_class: 'EFH',
        partner_id: getCustomerId(user),
        customer_id: getCustomerId(user),
        terms_and_conditions: false,
      },
    }, { verboseLogging: false })
      .then(data => Promise.resolve(data.canvas_url));
  },
  async setCanvasAuthToken() {
    try {
      CANVAS_AUTH_TOKEN = await CanvasService.getToken();
    } finally {
      console.log(`[${new Date().toISOString()}] CANVAS_AUTH_TOKEN reset`);
    }

    return CANVAS_AUTH_TOKEN;
  },
};

export default CanvasService;
