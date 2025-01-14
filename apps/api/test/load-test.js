/* eslint-disable import/no-unresolved -- k6 imports are resolved at runtime by the k6 engine */
import { check, group, sleep } from 'k6';
import { test } from 'k6/execution';
import http from 'k6/http';

const scenarios = {
  frontend: {
    executor: 'constant-vus',
    vus: 10,
    duration: '30s',
    tags: { test_type: 'frontend' },
  },
  // api_health: {
  //   executor: 'constant-arrival-rate',
  //   rate: 20,
  //   timeUnit: '1s',
  //   duration: '30s',
  //   preAllocatedVUs: 5,
  //   tags: { test_type: 'api' },
  // },
  api: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '10s', target: 5 },
      { duration: '20s', target: 5 },
      { duration: '10s', target: 0 },
    ],
    tags: { test_type: 'api' },
  },
};

export const options = {
  // eslint-disable-next-line no-undef -- k6 uses __ENV to access environment variables
  scenarios: __ENV.SCENARIO ? { [__ENV.SCENARIO]: scenarios[__ENV.SCENARIO] } : scenarios,
  thresholds: {
    'http_req_duration{test_type:frontend}': ['p(95)<500'],
    'http_req_duration{test_type:api}': ['p(95)<200'],
    'http_req_duration{test_type:graphql}': ['p(95)<200'],
  },
};

export function frontendTest() {
  group('Frontend Tests', () => {
    // eslint-disable-next-line no-undef -- k6 uses __ENV to access environment variables
    const response = http.get(`${__ENV.TARGET}`);
    check(response, {
      'frontend status is 200': (r) => r.status === 200,
    });
  });
}

// export function apiHealthTest() {
//   group('API Health Tests', () => {
//     const response = http.get('http://localhost:4000/health/check');
//     check(response, {
//       'api status is 200': (r) => r.status === 200,
//       'api response time < 200ms': (r) => r.timings.duration < 200,
//     });
//   });
// }

export function apiTest() {
  group('API Tests', () => {
    const headers = {
      'Content-Type': 'application/json',
      // eslint-disable-next-line no-undef -- k6 uses __ENV to access environment variables
      'X-E2E-Key': `${__ENV.SECRET_KEY}`,
    };

    // eslint-disable-next-line no-undef -- k6 uses __ENV to access environment variables
    const response = http.get(`${__ENV.TARGET}/health/testLoad`, { headers });
    check(response, {
      'api status is 200': (r) => r.status === 200,
      'api response has data': (r) => JSON.parse(r.body).data !== null,
      'api response time < 200ms': (r) => r.timings.duration < 200,
      'api response has 20 items': (r) => {
        const body = JSON.parse(r.body);
        const hasCorrectLength = body?.length === 20;
        if (!hasCorrectLength) {
          test.abort(`Expected 20 items but got ${body?.length}`);
        }
        return hasCorrectLength;
      },
    });
  });
}

// eslint-disable-next-line func-names -- k6 expects a default export
export default function () {
  // eslint-disable-next-line no-undef -- k6 uses __ENV to access environment variables
  if (__ENV.SCENARIO === 'frontend') {
    frontendTest();
    // } else if (__ENV.SCENARIO === 'api_health') {
    //   apiHealthTest();

    // eslint-disable-next-line no-undef -- k6 uses __ENV to access environment variables
  } else if (__ENV.SCENARIO === 'api') {
    apiTest();
  } else {
    // Run all tests if no specific scenario is selected
    frontendTest();
    sleep(1);
    // apiHealthTest();
    // sleep(1);
    apiTest();
  }
  sleep(1);
}
