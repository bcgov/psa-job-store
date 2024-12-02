import '@testing-library/jest-dom';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { useState } from 'react';
dotenv.config();

const {
  VITE_KEYCLOAK_REALM_URL,
  VITE_KEYCLOAK_CLIENT_ID,
  VITE_BACKEND_URL,
  VITE_KEYCLOAK_REDIRECT_URL,
  VITE_SUPPORT_EMAIL,
  VITE_ENV,
} = process.env;

jest.mock('./envConfig', () => ({
  VITE_BACKEND_URL: VITE_BACKEND_URL,
  VITE_KEYCLOAK_REALM_URL: VITE_KEYCLOAK_REALM_URL,
  VITE_KEYCLOAK_CLIENT_ID: VITE_KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_REDIRECT_URL: VITE_KEYCLOAK_REDIRECT_URL,
  VITE_SUPPORT_EMAIL: VITE_SUPPORT_EMAIL,
  VITE_ENV: VITE_ENV,
}));

jest.mock('react-oidc-context', () => ({
  ...jest.requireActual('react-oidc-context'),
  useAuth: () => ({
    isAuthenticated: true,
    user: {
      profile: {
        client_roles: ['total-compensation', 'classification', 'hiring-manager', 'super-admin'],
      },
    },
    isLoading: false,
    // Add other auth methods if needed
  }),
}));

jest.mock('./src/redux/services/graphql-api/position.api', () => ({
  useLazyGetPositionProfileQuery: jest.fn().mockReturnValue([
    jest.fn(), // mock trigger function
    {
      data: {
        positionProfile: [
          {
            positionNumber: '00543278',
            positionDescription: 'Exec Dir, Digital Capacity',
            departmentName: 'Informational Resource Management',
            employeeName: 'Grace Thompson',
            employeeEmail: null,
            classification: 'Band 5',
            ministry: "Citizens' Services",
            status: 'Active',
            classificationId: '',
            classificationPeoplesoftId: '',
            classificationEmployeeGroupId: '',
            effectiveDate: '2024-07-20',
          },
        ],
      },
      isLoading: false,
    }, // mock response object
  ]),
}));

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
        // getJobProfiles: {
        //   initiate: jest.fn().mockReturnValue({ data: [], isLoading: false }),
        // },
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

jest.mock('./src/redux/services/graphql-api/saved-job-profile.api', () => ({
  useGetSavedJobProfileIdsQuery: () => ({
    data: {
      getSavedJobProfileIds: [],
    },
    isLoading: false,
    refetch: jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          getSavedJobProfileIds: [],
        },
      }),
    ),
  }),
  useSaveJobProfileMutation: jest.fn().mockReturnValue([
    jest.fn().mockResolvedValue({
      data: {
        // updateJobProfileViewCount: true, // or whatever response shape you expect
      },
    }),
    {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    },
  ]),
  useRemoveSavedJobProfileMutation: jest.fn().mockReturnValue([
    jest.fn().mockResolvedValue({
      data: {
        // updateJobProfileViewCount: true, // or whatever response shape you expect
      },
    }),
    {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    },
  ]),
}));

const mockProfiles = {
  jobProfiles: [
    {
      id: 1,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 1,
            job_family_id: 1,
            name: 'Adjudication',
          },
        },
      ],
      title: 'Data Scientist',
      number: 194,
      context: '<p><strong>sdfsdfdsfsdasd</strong></p><p>as<em>dasd</em></p><p>dasd<strong>sfsdas</strong></p>',
      overview:
        'Data Scientist responsible for analyzing large data sets to derive actionable insights and support strategic decision-making.',
      accountabilities: [
        {
          text: 'Work with stakeholders to understand business requirements and deliver data-driven solutions.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Develop and implement databases, data collection systems, data analytics, and other strategies that optimize statistical efficiency and quality.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Collect, process, and clean data from various sources to prepare it for analysis.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Use statistical methods to analyze data and generate useful business reports.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Identify, analyze, and interpret trends or patterns in complex data sets.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Develop predictive models and machine-learning algorithms to support business decisions.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Present data and insights to stakeholders using visualization tools.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Collaborate with engineering and product development teams.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Monitor and assess the effectiveness of data and analytics strategies.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Ensure compliance with data governance and security policies.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: "Bachelor's degree in Data Science, Statistics, Mathematics, Computer Science, or related field.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: "Master's degree or PhD in Data Science, Applied Mathematics, or a related quantitative field preferred.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Certifications in data science, big data analytics, or related fields.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Proven record of engaging in professional development courses in machine learning, data analysis, and statistical modeling.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [
        {
          text: 'asd',
          is_readonly: false,
          is_significant: false,
        },
      ],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 22,
            name: 'Planning, organizing and coordinating',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
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
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '508010',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'ISL 24R',
            name: 'Information Systems R24',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 1,
            name: 'Administrative Services',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: {
        id: 1,
        name: 'Individual Contributor',
      },
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
      ],
      updated_at: '2024-11-29T16:30:13.353Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'Struk, Alex CITZ:EX',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:31.951Z',
      valid_to: null,
      version: 1,
    },
    {
      id: 3,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 1,
            job_family_id: 1,
            name: 'Adjudication',
          },
        },
      ],
      title: 'Dynamic Digital Marketing Specialist',
      number: 208,
      context:
        'The role frequently interfaces with external vendors and partners, coordinating with the Procurement Manager to negotiate contracts and manage supplier relationships effectively.',
      overview:
        'Dynamic Digital Marketing Specialist to develop, implement, track, and optimize our digital marketing campaigns across multiple programs and all digital channels.',
      accountabilities: [
        {
          text: 'Plan and execute all web, SEO/SEM, database marketing, email, social media, and display advertising campaigns.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Design, build, and maintain our social media presence.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Measure and report performance of all digital marketing campaigns, and assess against goals (ROI and KPIs).',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Identify trends and insights, and optimize spend and performance based on the insights.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Brainstorm new and creative growth strategies through digital marketing.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Plan, execute, and measure experiments and conversion tests.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Collaborate with internal teams to create landing pages and optimize user experience.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Utilize strong analytical ability to evaluate end-to-end customer experience across multiple channels and customer touchpoints.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Instrument conversion points and optimize user funnels.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Collaborate with agencies and other vendor partners.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Evaluate emerging technologies. Provide thought leadership and perspective for adoption where appropriate.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Develop and oversee A/B and multivariate tests to improve conversion rates.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Manage the strategy and setup of all paid campaigns.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: "Bachelor's degree in Marketing, Digital Media, or related field.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: "Master's degree in Marketing or related field preferred.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Certifications in Google Analytics, Google Ads, HubSpot, or other digital marketing tools.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Continuous learning through workshops, webinars, and courses in digital marketing and related technologies.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Strong grasp of current marketing tools and strategies and able to lead integrated digital marketing campaigns from concept to execution.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 22,
            name: 'Planning, organizing and coordinating',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
        },
        {
          behavioural_competency: {
            id: 41,
            name: 'Holding people accountable',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
        },
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '752203',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'SPV 15R',
            name: 'Supervisor R15',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 1,
            name: 'Administrative Services',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: null,
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
      ],
      updated_at: '2024-08-01T07:00:00.000Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'xxxx',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:31.971Z',
      valid_to: null,
      version: 1,
    },
    {
      id: 6,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 1,
            job_family_id: 1,
            name: 'Adjudication',
          },
        },
      ],
      title: 'Environmental Scientist',
      number: 212,
      context:
        'The individual occupies a critical position within the customer service team, reporting to the Customer Service Manager, who sets service standards and monitors team performance.',
      overview:
        'Passionate Environmental Scientist to analyze environmental data and develop strategies to address environmental issues and promote sustainability.',
      accountabilities: [
        {
          text: 'Conduct fieldwork and collect environmental data on air, water, soil, and plant life.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Analyze environmental data and report findings.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Develop environmental management plans for conservation and sustainable practices.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Advise policymakers and businesses on environmental best practices and regulations.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Conduct environmental impact assessments for new projects and developments.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Monitor environmental improvement programs and ensure compliance with environmental regulations.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Collaborate with environmental scientists, planners, hazardous waste technicians, engineers, and other specialists.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Investigate and report on incidents, such as pollution, wildlife disturbances, and contamination.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Promote environmental awareness through education and advocacy.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Stay updated on environmental legislation and scientific advancements.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Work on climate change analysis and modeling.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Engage in restoration projects for damaged ecosystems.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Utilize Geographic Information Systems (GIS) for data analysis and mapping.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Prepare environmental reports and presentations for various stakeholders.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: 'Bachelor’s degree in Environmental Science, Biology, Chemistry, Earth Science, or related field.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Master’s degree or PhD in Environmental Science or related discipline preferred.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Professional certifications related to environmental management and sustainability.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Continuous education through workshops, seminars, and courses in environmental laws, regulations, and policy.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Hands-on experience with analytical, scientific, and data analysis software.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Fieldwork experience and familiarity with environmental sampling techniques.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Understanding of Geographic Information Systems (GIS) and environmental modeling software.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 17,
            name: 'Business acumen',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
        },
        {
          behavioural_competency: {
            id: 21,
            name: 'Managing organizational resources',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
        },
        {
          behavioural_competency: {
            id: 22,
            name: 'Planning, organizing and coordinating',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
        },
        {
          behavioural_competency: {
            id: 23,
            name: 'Problem solving and judgement',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '508011',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'ISL 27R',
            name: 'Information Systems R27',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 1,
            name: 'Administrative Services',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: null,
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
      ],
      updated_at: '2024-08-01T07:00:00.000Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'xxxx',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:31.991Z',
      valid_to: null,
      version: 1,
    },
    {
      id: 7,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 1,
            job_family_id: 1,
            name: 'Adjudication',
          },
        },
      ],
      title: 'Financial Analyst',
      number: 247,
      context:
        'The job holder is part of the human resources team and is supervised by the HR Director, who sets policies for employee relations and development, offering mentorship and policy guidance.',
      overview:
        'Detail-oriented Financial Analyst to provide analysis of financial data, forecast future trends, and advise on investment decisions.',
      accountabilities: [
        {
          text: 'Analyze financial data and create financial models for decision support.',
          is_readonly: true,
          is_significant: true,
        },
        {
          text: 'Report on financial performance and prepare for regular leadership reviews.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Analyze past results, perform variance analysis, identify trends, and make recommendations for improvements.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Work closely with the accounting team to ensure accurate financial reporting.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Evaluate financial performance by comparing and analyzing actual results with plans and forecasts.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Guide the cost analysis process by establishing and enforcing policies and procedures.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Provide analysis of trends and forecasts and recommend actions for optimization.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Recommend actions by analyzing and interpreting data and making comparative analyses; study proposed changes in methods and materials.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Identify and drive process improvements, including the creation of standard and ad-hoc reports, tools, and Excel dashboards.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Increase productivity by developing automated reporting/forecasting tools.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Market research, data mining, business intelligence, and valuation comps.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: 'Bachelor’s degree in Finance, Economics, Accounting, Mathematics, Statistics, or related field.',
          is_readonly: true,
          is_significant: true,
        },
        {
          text: "Master's degree in Finance, Business Administration (MBA), or related field preferred.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Certifications such as Chartered Financial Analyst (CFA) or Certified Public Accountant (CPA) are advantageous.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Proven work experience as a Financial Analyst, Financial Consultant, or similar role.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Strong working knowledge of financial forecasting, corporate finance, information analysis, and financial modeling techniques.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Experience with statistical analysis and financial forecasting.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Attention to detail and the ability to identify data patterns.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Good verbal and written communication skills.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Advanced knowledge of Excel, including pivot tables, formulas, and charts.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [
        {
          text: 'Related experience',
          is_readonly: true,
          is_significant: true,
        },
        {
          text: 'Related experience 2',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Related experience 3',
          is_readonly: false,
          is_significant: false,
        },
      ],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 17,
            name: 'Business acumen',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
        },
        {
          behavioural_competency: {
            id: 21,
            name: 'Managing organizational resources',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
        },
        {
          behavioural_competency: {
            id: 22,
            name: 'Planning, organizing and coordinating',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
        },
        {
          behavioural_competency: {
            id: 23,
            name: 'Problem solving and judgement',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
        },
        {
          behavioural_competency: {
            id: 42,
            name: 'Leadership',
            description:
              "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '508010',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'ISL 24R',
            name: 'Information Systems R24',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 7,
            name: 'Finance',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: null,
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
      ],
      updated_at: '2024-08-01T07:00:00.000Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'xxxx',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:32.000Z',
      valid_to: null,
      version: 1,
    },
    {
      id: 2,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 1,
            job_family_id: 1,
            name: 'Adjudication',
          },
        },
      ],
      title: 'Project Manager',
      number: 200,
      context:
        "The employee will work under the guidance of the Chief Financial Officer, who is responsible for the company's financial health and provides direction on budget management and financial planning.",
      overview:
        'Experienced Project Manager to lead cross-functional teams in the successful delivery of high-stake projects.',
      accountabilities: [
        {
          text: 'Define project scope, goals, and deliverables that support business goals.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Develop full-scale project plans and associated communication documents.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Effectively communicate project expectations to team members and stakeholders.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Delegate tasks and responsibilities to appropriate personnel.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Identify and resolve issues and conflicts within the project team.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Plan, schedule, and track project timelines, milestones, and deliverables.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Develop and deliver progress reports, proposals, requirements documentation, and presentations.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Determine the frequency and content of status reports from the project team.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Perform risk management to minimize project risks.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Establish and maintain relationships with third parties/vendors.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Monitor and adjust project plans and operations as needed.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Secure acceptance and approval of deliverables from stakeholders.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Ensure project documents are complete, current, and stored appropriately.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Manage project budget and resource allocation.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Facilitate team meetings effectively and ensure project deadlines are met.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: "Bachelor's degree in Business Administration, Management, Computer Science, or related field.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: "Master's degree in Project Management, Business, or related field preferred.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Certification in Project Management (PMP, PRINCE2, Agile, or equivalent).',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Additional certifications related to industry-specific project management.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Continuous education in project management tools and techniques.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 22,
            name: 'Planning, organizing and coordinating',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
        },
        {
          behavioural_competency: {
            id: 41,
            name: 'Holding people accountable',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
        },
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '508013',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'ISL 30R',
            name: 'Information Systems R30',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 1,
            name: 'Administrative Services',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: null,
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
      ],
      updated_at: '2024-08-01T07:00:00.000Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'xxxx',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:31.960Z',
      valid_to: null,
      version: 1,
    },
    {
      id: 4,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 33,
            job_family_id: 7,
            name: 'Budgeting',
          },
        },
      ],
      title: 'Senior Software Engineer',
      number: 189,
      context:
        'The position often collaborates closely with the IT department to ensure the security and efficiency of data management systems, receiving technical support as needed.',
      overview: 'Senior Software Engineer responsible for developing scalable web applications.',
      accountabilities: [
        {
          text: 'Design, develop, and maintain web applications.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Ensure the performance, quality, and responsiveness of applications.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Collaborate with a team to define, design, and ship new features.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Identify and correct bottlenecks and fix bugs.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Ensure compliance with security and data protection regulations.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Engage with stakeholders to gather and define requirements.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Manage project timelines and deliverables.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Troubleshoot and debug applications to optimize performance.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Stay updated with the latest in technology and incorporate it into our platforms.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Conduct code reviews and ensure software quality standards are met.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Mentor junior developers and promote best coding practices.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Ensure the performance, quality, and responsiveness of applications.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: "Bachelor's degree in Computer Science, Information Technology, or related field.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: "Master's or PhD in Computer Science or a related field preferred.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Certifications in software development, project management, or related fields.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [],
      behavioural_competencies: [
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
        {
          behavioural_competency: {
            id: 45,
            name: 'Concern for order',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '508011',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'ISL 27R',
            name: 'Information Systems R27',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 7,
            name: 'Finance',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: null,
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
      ],
      updated_at: '2024-08-01T07:00:00.000Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'xxxx',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:31.939Z',
      valid_to: null,
      version: 1,
    },
    {
      id: 5,
      all_reports_to: false,
      all_organizations: true,
      streams: [
        {
          stream: {
            id: 33,
            job_family_id: 7,
            name: 'Budgeting',
          },
        },
      ],
      title: 'Strategic HR Analyst Manager',
      number: 210,
      context:
        'Team members report to the Project Lead, who coordinates project tasks and timelines, ensuring alignment with client expectations and project goals.',
      overview:
        'Strategic HR Analyst Manager to lead multiple programs for our HR practices and objectives that will provide an employee-oriented, high-performance culture emphasizing empowerment, quality, productivity, and standards.',
      accountabilities: [
        {
          text: 'Develop and implement HR strategies and initiatives aligned with the overall business strategy.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Bridge management and employee relations by addressing demands, grievances, or other issues.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Manage the recruitment and selection process.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Support current and future business needs through the development, engagement, motivation, and preservation of human capital.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Develop and monitor overall HR strategies, systems, tactics, and procedures across the organization.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Nurture a positive working environment.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Oversee and manage a performance appraisal system that drives high performance.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Maintain pay plan and benefits program.',
          is_readonly: false,
          is_significant: false,
        },
        {
          text: 'Assess training needs to apply and monitor training programs.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Ensure legal compliance throughout human resource management.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Manage HR staff and respond to employee queries.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Develop and revise HR policies and documents.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Handle workplace safety, welfare, wellness, and health reporting.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Oversee employee disciplinary meetings, terminations, and investigations.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      education: [
        {
          text: "Bachelor's degree in Human Resources, Business Administration, or related field.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: "Master's degree in Human Resources Management or related field preferred.",
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Professional certification in HR (e.g., PHR, SPHR, SHRM-CP, SHRM-SCP) is highly desirable.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Proven continuous learning in employment law, compensation, organizational planning, organization development, employee relations, safety, training, and preventive labor relations.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Courses and workshops on leadership, conflict resolution, and negotiation skills.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Experience with HR metrics and HR systems and databases.',
          is_readonly: false,
          is_significant: true,
        },
        {
          text: 'Ability to architect strategy along with leadership skills.',
          is_readonly: false,
          is_significant: true,
        },
      ],
      job_experience: [],
      behavioural_competencies: [
        {
          behavioural_competency: {
            id: 17,
            name: 'Business acumen',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
        },
        {
          behavioural_competency: {
            id: 21,
            name: 'Managing organizational resources',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
        },
        {
          behavioural_competency: {
            id: 22,
            name: 'Planning, organizing and coordinating',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
        },
        {
          behavioural_competency: {
            id: 23,
            name: 'Problem solving and judgement',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
        },
      ],
      classifications: [
        {
          classification: {
            id: '501537',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'COMM O 30R',
            name: 'Communications Officer R30',
          },
        },
      ],
      jobFamilies: [
        {
          jobFamily: {
            id: 7,
            name: 'Finance',
          },
        },
      ],
      role: {
        id: 1,
        name: 'Operational/Administration',
      },
      role_type: null,
      organizations: [],
      reports_to: [
        {
          classification: {
            id: '185001',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 1',
          },
        },
        {
          classification: {
            id: '185002',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 2',
          },
        },
        {
          classification: {
            id: '185003',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 3',
          },
        },
        {
          classification: {
            id: '185004',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 4',
          },
        },
        {
          classification: {
            id: '185005',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 5',
          },
        },
        {
          classification: {
            id: '185006',
            employee_group_id: 'MGT',
            peoplesoft_id: 'BCSET',
            code: 'Band 6',
          },
        },
      ],
      updated_at: '2024-08-01T07:00:00.000Z',
      owner: {
        name: 'xxxx',
      },
      updated_by: {
        name: 'xxxx',
      },
      published_by: {
        name: 'xxxx',
      },
      valid_from: '2024-11-28T15:56:31.980Z',
      valid_to: null,
      version: 1,
    },
  ],
  jobProfilesCount: 7,
  pageNumberForSelectProfile: -1,
};

let setState: any = null;

const mockTrigger = jest.fn().mockImplementation(() => {
  setState({
    data: mockProfiles,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
  });
  return Promise.resolve({ data: mockProfiles });
});

jest.mock('./src/redux/services/graphql-api/job-profile.api', () => ({
  useLazyGetJobProfileQuery: jest.fn().mockReturnValue([
    jest.fn(), // mock trigger function
    {
      data: {
        /* Mock the expected data structure returned by the query */
        jobProfile: {
          id: 1,
          updated_at: '2024-12-02T16:27:00.015Z',
          streams: [
            {
              stream: {
                id: 1,
                name: 'Adjudication',
                job_family_id: 1,
              },
            },
          ],
          title: 'Data Scientist',
          number: 194,
          context: '<p><strong>sdfsdfdsfsdasd</strong></p><p>as<em>dasd</em></p><p>dasd<strong>sfsdas</strong></p>',
          state: 'PUBLISHED',
          security_screenings: [
            {
              text: 'asd',
              is_readonly: false,
              is_significant: false,
            },
          ],
          all_reports_to: false,
          all_organizations: true,
          willingness_statements: [],
          knowledge_skills_abilities: [
            {
              text: 'asd',
            },
          ],
          professional_registration_requirements: [],
          optional_requirements: [],
          program_overview: '',
          review_required: false,
          overview:
            'Data Scientist responsible for analyzing large data sets to derive actionable insights and support strategic decision-making.',
          accountabilities: [
            {
              text: 'Work with stakeholders to understand business requirements and deliver data-driven solutions.',
              is_readonly: false,
              is_significant: false,
            },
            {
              text: 'Develop and implement databases, data collection systems, data analytics, and other strategies that optimize statistical efficiency and quality.',
              is_readonly: false,
              is_significant: false,
            },
            {
              text: 'Collect, process, and clean data from various sources to prepare it for analysis.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Use statistical methods to analyze data and generate useful business reports.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Identify, analyze, and interpret trends or patterns in complex data sets.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Develop predictive models and machine-learning algorithms to support business decisions.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Present data and insights to stakeholders using visualization tools.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Collaborate with engineering and product development teams.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Monitor and assess the effectiveness of data and analytics strategies.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Ensure compliance with data governance and security policies.',
              is_readonly: false,
              is_significant: true,
            },
          ],
          preferences: [],
          education: [
            {
              text: "Bachelor's degree in Data Science, Statistics, Mathematics, Computer Science, or related field.",
              is_readonly: false,
              is_significant: true,
            },
            {
              text: "Master's degree or PhD in Data Science, Applied Mathematics, or a related quantitative field preferred.",
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Certifications in data science, big data analytics, or related fields.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Proven record of engaging in professional development courses in machine learning, data analysis, and statistical modeling.',
              is_readonly: false,
              is_significant: true,
            },
          ],
          job_experience: [
            {
              text: 'asd',
              is_readonly: false,
              is_significant: false,
            },
          ],
          scopes: [
            {
              scope: {
                id: 2,
                name: 'Ministry focus',
                description: 'DM or Associate DM level',
              },
            },
          ],
          total_comp_create_form_misc: {
            markAllNonEditable: false,
            markAllSignificant: false,
            markAllNonEditableEdu: false,
            markAllNonEditableSec: false,
            markAllSignificantEdu: false,
            markAllNonEditableProReg: false,
            markAllSignificantProReg: false,
            markAllNonEditableJob_experience: false,
            markAllSignificantJob_experience: false,
            markAllSignificantSecurityScreenings: false,
          },
          role_type: {
            id: 1,
            name: 'Individual Contributor',
          },
          behavioural_competencies: [
            {
              behavioural_competency: {
                id: 22,
                name: 'Planning, organizing and coordinating',
                description:
                  "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
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
            {
              behavioural_competency: {
                id: 45,
                name: 'Concern for order',
                description:
                  "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
              },
            },
          ],
          classifications: [
            {
              classification: {
                id: '508010',
                employee_group_id: 'GEU',
                peoplesoft_id: 'BCSET',
                code: 'ISL 24R',
                name: 'Information Systems R24',
              },
            },
          ],
          jobFamilies: [
            {
              jobFamily: {
                id: 1,
                name: 'Administrative Services',
              },
            },
          ],
          role: {
            id: 1,
            name: 'Operational/Administration',
          },
          organizations: [],
          reports_to: [
            {
              classification: {
                id: '185006',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 6',
              },
            },
            {
              classification: {
                id: '185005',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 5',
              },
            },
            {
              classification: {
                id: '185004',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 4',
              },
            },
            {
              classification: {
                id: '185003',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 3',
              },
            },
            {
              classification: {
                id: '185002',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 2',
              },
            },
            {
              classification: {
                id: '185001',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 1',
              },
            },
          ],
          is_archived: false,
          valid_from: '2024-11-28T15:56:31.951Z',
          valid_to: null,
          version: 1,
        },
      },
      isLoading: false,
    }, // mock response object
  ]),
  useGetJobProfileMetaQuery: jest.fn().mockReturnValue([
    jest.fn().mockResolvedValue({
      data: {
        jobProfileMeta: {
          totalViews: 3,
          firstPublishedBy: {
            date: '2024-07-15T07:00:00.000Z',
            user: 'xxxx',
          },
          firstCreatedBy: {
            date: '2024-07-01T07:00:00.000Z',
            owner: 'xxxx',
          },
          versions: [
            {
              id: 1,
              version: 1,
            },
          ],
        },
      },
    }),
    {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    },
  ]),
  useLazyGetJobProfileByNumberQuery: jest.fn().mockReturnValue([
    jest.fn().mockResolvedValue({
      data: {
        jobProfileByNumber: {
          id: 1,
          updated_at: '2024-12-02T16:27:00.015Z',
          streams: [
            {
              stream: {
                id: 1,
                name: 'Adjudication',
                job_family_id: 1,
              },
            },
          ],
          title: 'Data Scientist',
          number: 194,
          context: '<p><strong>sdfsdfdsfsdasd</strong></p><p>as<em>dasd</em></p><p>dasd<strong>sfsdas</strong></p>',
          state: 'PUBLISHED',
          security_screenings: [
            {
              text: 'asd',
              is_readonly: false,
              is_significant: false,
            },
          ],
          all_reports_to: false,
          all_organizations: true,
          willingness_statements: [],
          knowledge_skills_abilities: [
            {
              text: 'asd',
            },
          ],
          professional_registration_requirements: [],
          optional_requirements: [],
          program_overview: '',
          review_required: false,
          overview:
            'Data Scientist responsible for analyzing large data sets to derive actionable insights and support strategic decision-making.',
          accountabilities: [
            {
              text: 'Work with stakeholders to understand business requirements and deliver data-driven solutions.',
              is_readonly: false,
              is_significant: false,
            },
            {
              text: 'Develop and implement databases, data collection systems, data analytics, and other strategies that optimize statistical efficiency and quality.',
              is_readonly: false,
              is_significant: false,
            },
            {
              text: 'Collect, process, and clean data from various sources to prepare it for analysis.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Use statistical methods to analyze data and generate useful business reports.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Identify, analyze, and interpret trends or patterns in complex data sets.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Develop predictive models and machine-learning algorithms to support business decisions.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Present data and insights to stakeholders using visualization tools.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Collaborate with engineering and product development teams.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Monitor and assess the effectiveness of data and analytics strategies.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Ensure compliance with data governance and security policies.',
              is_readonly: false,
              is_significant: true,
            },
          ],
          preferences: [],
          education: [
            {
              text: "Bachelor's degree in Data Science, Statistics, Mathematics, Computer Science, or related field.",
              is_readonly: false,
              is_significant: true,
            },
            {
              text: "Master's degree or PhD in Data Science, Applied Mathematics, or a related quantitative field preferred.",
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Certifications in data science, big data analytics, or related fields.',
              is_readonly: false,
              is_significant: true,
            },
            {
              text: 'Proven record of engaging in professional development courses in machine learning, data analysis, and statistical modeling.',
              is_readonly: false,
              is_significant: true,
            },
          ],
          job_experience: [
            {
              text: 'asd',
              is_readonly: false,
              is_significant: false,
            },
          ],
          scopes: [
            {
              scope: {
                id: 2,
                name: 'Ministry focus',
                description: 'DM or Associate DM level',
              },
            },
          ],
          total_comp_create_form_misc: {
            markAllNonEditable: false,
            markAllSignificant: false,
            markAllNonEditableEdu: false,
            markAllNonEditableSec: false,
            markAllSignificantEdu: false,
            markAllNonEditableProReg: false,
            markAllSignificantProReg: false,
            markAllNonEditableJob_experience: false,
            markAllSignificantJob_experience: false,
            markAllSignificantSecurityScreenings: false,
          },
          role_type: {
            id: 1,
            name: 'Individual Contributor',
          },
          behavioural_competencies: [
            {
              behavioural_competency: {
                id: 22,
                name: 'Planning, organizing and coordinating',
                description:
                  "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
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
            {
              behavioural_competency: {
                id: 45,
                name: 'Concern for order',
                description:
                  "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
              },
            },
          ],
          classifications: [
            {
              classification: {
                id: '508010',
                employee_group_id: 'GEU',
                peoplesoft_id: 'BCSET',
                code: 'ISL 24R',
                name: 'Information Systems R24',
              },
            },
          ],
          jobFamilies: [
            {
              jobFamily: {
                id: 1,
                name: 'Administrative Services',
              },
            },
          ],
          role: {
            id: 1,
            name: 'Operational/Administration',
          },
          organizations: [],
          reports_to: [
            {
              classification: {
                id: '185006',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 6',
              },
            },
            {
              classification: {
                id: '185005',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 5',
              },
            },
            {
              classification: {
                id: '185004',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 4',
              },
            },
            {
              classification: {
                id: '185003',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 3',
              },
            },
            {
              classification: {
                id: '185002',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 2',
              },
            },
            {
              classification: {
                id: '185001',
                employee_group_id: 'MGT',
                peoplesoft_id: 'BCSET',
                code: 'Band 1',
              },
            },
          ],
          is_archived: false,
          valid_from: '2024-11-28T15:56:31.951Z',
          valid_to: null,
          version: 1,
        },
      },
    }),
    {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    },
  ]),
  useLazyGetJobProfilesQuery: () => {
    const [state, setStateLocal] = useState({
      data: null,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    });
    setState = setStateLocal;
    return [mockTrigger, state];
  },
  useUpdateJobProfileViewCountMutation: jest.fn().mockReturnValue([
    jest.fn().mockResolvedValue({
      data: {
        updateJobProfileViewCount: true, // or whatever response shape you expect
      },
    }),
    {
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    },
  ]),
  useGetJobProfilesClassificationsQuery: jest.fn().mockReturnValue([
    jest.fn(), // mock trigger function
    {
      data: {
        jobProfilesClassifications: [
          {
            id: '501537',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'COMM O 30R',
            name: 'Communications Officer R30',
            grade: '30A',
          },
          {
            id: '508010',
            employee_group_id: 'GEU',
            peoplesoft_id: 'BCSET',
            code: 'ISL 24R',
            name: 'Information Systems R24',
            grade: '24A',
          },
        ],
      },
      isLoading: false,
    }, // mock response object
  ]),
  useGetJobProfilesMinistriesQuery: jest.fn().mockReturnValue({
    jobProfilesMinistries: [],
  }),
}));

jest.mock('./src/redux/services/graphql-api/job-profile-stream', () => ({
  useGetJobProfileStreamsQuery: jest.fn().mockReturnValue({
    data: {
      jobProfileStreams: [
        {
          id: 1,
          job_family_id: 1,
          name: 'Adjudication',
        },
        {
          id: 2,
          job_family_id: 1,
          name: 'Administrative Support',
        },
        {
          id: 3,
          job_family_id: 1,
          name: 'Application/Systems Administration',
        },
        {
          id: 4,
          job_family_id: 1,
          name: 'Business Continuity',
        },
        {
          id: 5,
          job_family_id: 1,
          name: 'Communications Support',
        },
        {
          id: 6,
          job_family_id: 1,
          name: 'Consulting Services',
        },
        {
          id: 7,
          job_family_id: 1,
          name: 'Executive Administrative Services',
        },
        {
          id: 8,
          job_family_id: 1,
          name: 'Facilities/Property Administration',
        },
        {
          id: 9,
          job_family_id: 1,
          name: 'Financial Administration',
        },
        {
          id: 10,
          job_family_id: 1,
          name: 'HR Administration',
        },
        {
          id: 11,
          job_family_id: 1,
          name: 'Office Administration',
        },
        {
          id: 12,
          job_family_id: 1,
          name: 'Program Review/Planning',
        },
        {
          id: 13,
          job_family_id: 1,
          name: 'Project Management Support',
        },
        {
          id: 14,
          job_family_id: 1,
          name: 'Records and Information Management',
        },
        {
          id: 15,
          job_family_id: 1,
          name: 'Training Administration',
        },
        {
          id: 16,
          job_family_id: 1,
          name: 'Warehouse Operations/Administration',
        },
        {
          id: 17,
          job_family_id: 2,
          name: 'Client Relations',
        },
        {
          id: 18,
          job_family_id: 2,
          name: 'Correspondence',
        },
        {
          id: 19,
          job_family_id: 2,
          name: 'Event Planning',
        },
        {
          id: 20,
          job_family_id: 2,
          name: 'Publications and Graphics',
        },
        {
          id: 21,
          job_family_id: 2,
          name: 'Writing',
        },
        {
          id: 22,
          job_family_id: 3,
          name: 'Enforcement',
        },
        {
          id: 23,
          job_family_id: 3,
          name: 'Correctional Services',
        },
        {
          id: 24,
          job_family_id: 3,
          name: 'Deputy Sheriff Services',
        },
        {
          id: 25,
          job_family_id: 3,
          name: 'Inspection',
        },
        {
          id: 26,
          job_family_id: 3,
          name: 'Investigation',
        },
        {
          id: 27,
          job_family_id: 4,
          name: 'Legal Administration and Management',
        },
        {
          id: 28,
          job_family_id: 4,
          name: 'Legal Counsel',
        },
        {
          id: 29,
          job_family_id: 4,
          name: 'Paralegal Services',
        },
        {
          id: 30,
          job_family_id: 5,
          name: 'Educational Officers',
        },
        {
          id: 31,
          job_family_id: 7,
          name: 'Accounting',
        },
        {
          id: 32,
          job_family_id: 7,
          name: 'Auditing',
        },
        {
          id: 33,
          job_family_id: 7,
          name: 'Budgeting',
        },
        {
          id: 34,
          job_family_id: 7,
          name: 'Procurement',
        },
        {
          id: 35,
          job_family_id: 7,
          name: 'Revenue Management',
        },
        {
          id: 36,
          job_family_id: 7,
          name: 'Risk Management',
        },
        {
          id: 37,
          job_family_id: 8,
          name: 'Dietician Services',
        },
        {
          id: 38,
          job_family_id: 8,
          name: 'Health Support',
        },
        {
          id: 39,
          job_family_id: 8,
          name: 'Health Therapy',
        },
        {
          id: 40,
          job_family_id: 8,
          name: 'Nursing',
        },
        {
          id: 41,
          job_family_id: 8,
          name: 'Pharmacy',
        },
        {
          id: 42,
          job_family_id: 8,
          name: 'Psychology',
        },
        {
          id: 43,
          job_family_id: 9,
          name: 'Heritage Resource Officer',
        },
        {
          id: 44,
          job_family_id: 10,
          name: 'Consulting',
        },
        {
          id: 45,
          job_family_id: 10,
          name: 'Hiring Administration',
        },
        {
          id: 46,
          job_family_id: 10,
          name: 'Talent Management',
        },
        {
          id: 47,
          job_family_id: 10,
          name: 'Total Compensation',
        },
        {
          id: 48,
          job_family_id: 10,
          name: 'Training',
        },
        {
          id: 49,
          job_family_id: 10,
          name: 'Workforce Planning',
        },
        {
          id: 50,
          job_family_id: 12,
          name: 'Archival Services',
        },
        {
          id: 51,
          job_family_id: 12,
          name: 'Information Management',
        },
        {
          id: 52,
          job_family_id: 12,
          name: 'Information Services/Technology',
        },
        {
          id: 53,
          job_family_id: 14,
          name: 'Data Science',
        },
        {
          id: 54,
          job_family_id: 14,
          name: 'Economics',
        },
        {
          id: 55,
          job_family_id: 14,
          name: 'Policy',
        },
        {
          id: 56,
          job_family_id: 14,
          name: 'Program Review and Planning',
        },
        {
          id: 57,
          job_family_id: 14,
          name: 'Research and Statistics',
        },
        {
          id: 58,
          job_family_id: 15,
          name: 'Project Management',
        },
        {
          id: 59,
          job_family_id: 16,
          name: 'Marketing and Sales',
        },
        {
          id: 60,
          job_family_id: 16,
          name: 'Retail Operations',
        },
        {
          id: 61,
          job_family_id: 16,
          name: 'Warehouse Operations',
        },
        {
          id: 62,
          job_family_id: 17,
          name: 'Agrology',
        },
        {
          id: 63,
          job_family_id: 17,
          name: 'Biology',
        },
        {
          id: 64,
          job_family_id: 17,
          name: 'Emergency Management',
        },
        {
          id: 65,
          job_family_id: 17,
          name: 'Engineering',
        },
        {
          id: 66,
          job_family_id: 17,
          name: 'Geomatics',
        },
        {
          id: 67,
          job_family_id: 17,
          name: 'Geoscience',
        },
        {
          id: 68,
          job_family_id: 17,
          name: 'Laboratory Services\t\t',
        },
        {
          id: 69,
          job_family_id: 17,
          name: 'Resource Management',
        },
        {
          id: 70,
          job_family_id: 18,
          name: 'Adoptions/Guardianship',
        },
        {
          id: 71,
          job_family_id: 18,
          name: 'Child Protection',
        },
        {
          id: 72,
          job_family_id: 18,
          name: 'Family Justice',
        },
        {
          id: 73,
          job_family_id: 18,
          name: 'Financial Assistance Services',
        },
        {
          id: 74,
          job_family_id: 18,
          name: 'Forensic',
        },
        {
          id: 75,
          job_family_id: 18,
          name: 'Mental Health Services',
        },
        {
          id: 76,
          job_family_id: 18,
          name: 'Nursing',
        },
        {
          id: 77,
          job_family_id: 18,
          name: 'Probation',
        },
        {
          id: 78,
          job_family_id: 18,
          name: 'Psychology',
        },
        {
          id: 79,
          job_family_id: 18,
          name: 'Resource Services',
        },
        {
          id: 80,
          job_family_id: 18,
          name: 'Victims Services',
        },
        {
          id: 81,
          job_family_id: 19,
          name: 'Coop Student',
        },
        {
          id: 82,
          job_family_id: 19,
          name: 'Equity and Diversity Internship',
        },
        {
          id: 83,
          job_family_id: 19,
          name: 'Indigenous Youth internship Program',
        },
        {
          id: 84,
          job_family_id: 19,
          name: 'Work-able',
        },
        {
          id: 85,
          job_family_id: 19,
          name: 'Youth Employment Program',
        },
        {
          id: 86,
          job_family_id: 21,
          name: 'Veterinarians',
        },
      ],
    },
    isLoading: false,
  }),
}));
