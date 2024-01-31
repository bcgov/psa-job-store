import '@testing-library/jest-dom';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

const { VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_CLIENT_ID, VITE_BACKEND_URL, VITE_KEYCLOAK_REDIRECT_URL } = process.env;

jest.mock('./envConfig', () => ({
  VITE_BACKEND_URL: VITE_BACKEND_URL,
  VITE_KEYCLOAK_REALM_URL: VITE_KEYCLOAK_REALM_URL,
  VITE_KEYCLOAK_CLIENT_ID: VITE_KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_REDIRECT_URL: VITE_KEYCLOAK_REDIRECT_URL,
}));

// jest.mock('../../redux/services/graphql-api', () => ({
//   graphqlApi: {
//     reducerPath: 'mockReducerPath',
//     reducer: () => ({}),
//     middleware: () => ({}),
//     injectEndpoints: () => ({}),
//   },
//   useLazyGetJobProfilesQuery: jest.fn().mockImplementation(() => [
//     jest.fn(), // mock trigger function
//     {
//       data: {
//         /* mock response data */
//       },
//       isLoading: false,
//     }, // mock response object
//   ]),
// }));

jest.mock('./src/redux/services/graphql-api/organization', () => ({
  useGetOrganizationsQuery: jest.fn().mockReturnValue({
    data: {
      organizations: [
        { id: 0, name: 'Organization A' },
        { id: 1, name: 'Organization B' },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock('./src/redux/services/graphql-api', () => {
  return {
    graphqlApi: {
      reducerPath: 'mockReducerPath',
      reducer: () => ({}),
      middleware: () => ({}),
      injectEndpoints: () => ({}),
    },
    jobProfileApi: {
      endpoints: {
        getJobProfiles: {
          initiate: jest.fn().mockReturnValue({ data: [], isLoading: false }),
        },
      },
    },
  };
});

jest.mock('./src/redux/services/graphql-api/job-family.api', () => ({
  useGetJobFamiliesQuery: jest.fn().mockReturnValue({
    data: {
      jobFamilies: [
        {
          id: 2,
          name: 'Engineering',
        },
        {
          id: 3,
          name: 'Science',
        },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock('./src/redux/services/graphql-api/job-role.api', () => ({
  useGetJobRolesQuery: jest.fn().mockReturnValue({
    data: {
      jobRoles: [
        { id: 1, name: 'Developer' },
        { id: 1, name: 'Administrator' },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock('./src/redux/services/graphql-api/classification.api', () => ({
  useGetClassificationsQuery: jest.fn().mockReturnValue({
    data: {
      classifications: [
        {
          id: '1',
          code: 'A 1',
        },
        {
          id: '2',
          code: 'B 2',
        },
        {
          id: '3',
          code: 'C 3',
        },
        {
          id: '4',
          code: 'D 4',
        },
        {
          id: '5',
          code: 'E 5',
        },
        {
          id: '6',
          code: 'F 6',
        },
        {
          id: '7',
          code: 'G 7',
        },
      ],
    },
    isLoading: false,
  }),
}));

jest.mock('./src/redux/services/graphql-api/job-profile.api', () => ({
  useLazyGetJobProfileQuery: jest.fn().mockReturnValue([
    jest.fn(), // mock trigger function
    {
      data: {
        /* Mock the expected data structure returned by the query */
        jobProfile: {
          id: 4,
          stream: 'CORPORATE',
          title: 'IT Specialist',
          number: 189,
          context: { description: 'Context 1' },
          overview: 'Overview 1',
          accountabilities: {
            optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
            required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
          },
          requirements: ['R 1', 'R 2', 'R 3'],
          behavioural_competencies: [
            {
              behavioural_competency: {
                id: 45,
                name: 'Concern for order',
                description:
                  "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
              },
            },
            {
              behavioural_competency: {
                id: 35,
                name: 'Service orientation',
                description:
                  'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
              },
            },
            {
              behavioural_competency: {
                id: 36,
                name: 'Teamwork and cooperation',
                description:
                  'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
              },
            },
          ],
          classification: {
            id: '551052',
            code: 'A 1',
          },
          family: {
            id: 3,
            name: 'Budgeting',
          },
          role: null,
          career_group: {
            id: 1,
            name: 'Administrative Services',
          },
          organization: null,
          reports_to: [
            {
              classification: {
                id: '185001',
                code: 'Band 1',
              },
            },
            {
              classification: {
                id: '185002',
                code: 'Band 2',
              },
            },
            {
              classification: {
                id: '185003',
                code: 'Band 3',
              },
            },
            {
              classification: {
                id: '185004',
                code: 'Band 4',
              },
            },
            {
              classification: {
                id: '185005',
                code: 'Band 5',
              },
            },
            {
              classification: {
                id: '185006',
                code: 'Band 6',
              },
            },
          ],
        },
      },
      isLoading: false,
    }, // mock response object
  ]),
  useLazyGetJobProfilesQuery: jest.fn().mockReturnValue([
    jest.fn(), // mock trigger function
    {
      data: {
        jobProfiles: [
          {
            id: 4,
            stream: 'CORPORATE',
            title: 'IT Specialist',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
          {
            id: 5,
            stream: 'CORPORATE',
            title: 'Program Assistant',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
          {
            id: 6,
            stream: 'CORPORATE',
            title: 'Office Manager',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
          {
            id: 7,
            stream: 'CORPORATE',
            title: 'Financial Analyst',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
          {
            id: 8,
            stream: 'CORPORATE',
            title: 'Budget Analyst',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
          {
            id: 9,
            stream: 'CORPORATE',
            title: 'Frontend Developer',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
          {
            id: 10,
            stream: 'CORPORATE',
            title: 'Backend Developer',
            number: 189,
            context: { description: 'Context 1' },
            overview: 'Overview 1',
            accountabilities: {
              optional: ['Opt 1', 'Opt 2', 'Opt 3', 'Opt 4', 'Opt 5'],
              required: ['Req 1', 'Req 2', 'Req 3', 'Req 4'],
            },
            requirements: ['R 1', 'R 2', 'R 3'],
            behavioural_competencies: [
              {
                behavioural_competency: {
                  id: 45,
                  name: 'Concern for order',
                  description:
                    "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
                },
              },
              {
                behavioural_competency: {
                  id: 35,
                  name: 'Service orientation',
                  description:
                    'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
                },
              },
              {
                behavioural_competency: {
                  id: 36,
                  name: 'Teamwork and cooperation',
                  description:
                    'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
                },
              },
            ],
            classifications: [{ classification: { id: '551052', code: 'A 1' } }],
            family: {
              id: 3,
              name: 'Budgeting',
            },
            role: null,
            career_group: {
              id: 1,
              name: 'Administrative Services',
            },
            organization: null,
            reports_to: [
              {
                classification: {
                  id: '185001',
                  code: 'Band 1',
                },
              },
              {
                classification: {
                  id: '185002',
                  code: 'Band 2',
                },
              },
              {
                classification: {
                  id: '185003',
                  code: 'Band 3',
                },
              },
              {
                classification: {
                  id: '185004',
                  code: 'Band 4',
                },
              },
              {
                classification: {
                  id: '185005',
                  code: 'Band 5',
                },
              },
              {
                classification: {
                  id: '185006',
                  code: 'Band 6',
                },
              },
            ],
          },
        ],
        jobProfilesCount: 7,
      },
      isLoading: false,
    }, // mock response object
  ]),
}));
