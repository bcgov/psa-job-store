// import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import {
  BehaviouralCompetencyCategory,
  BehaviouralCompetencyType,
  JobProfile,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { ExtendedPrismaClientType } from '../modules/prisma/extended-prisma-client.impl';

const prismaBlank = new PrismaClient();

const SYSTEM_USER_ID = 'f1851282-d875-4f22-9590-6c0405d3bc78';
const TEST_USER_ID = '88bd8bb6-c449-4c13-8204-d91539f548d4';

export async function seed(prismaInp?: ExtendedPrismaClientType) {
  const prisma = prismaInp || prismaBlank;

  // console.log('Creating system user...');
  // // Try create instead of upsert first
  // await prisma.user.create({
  //   data: {
  //     id: SYSTEM_USER_ID,
  //     name: 'SYSTEM USER',
  //   },
  // });

  // console.log('System user created');
  // const users = await prisma.user.findMany();
  // console.log('Current users:', users);

  await prisma.user.upsert({
    where: { id: SYSTEM_USER_ID },
    create: {
      id: SYSTEM_USER_ID,
      name: 'SYSTEM USER',
    },
    update: {
      name: 'SYSTEM USER',
    },
  });

  await prisma.user.upsert({
    where: { id: TEST_USER_ID },
    create: {
      id: TEST_USER_ID,
      name: 'xxxx',
      roles: ['hiring-manager'],
      metadata: {
        crm: {
          account_id: null,
          contact_id: 231166,
        },
        org_chart: {
          department_ids: ['112-0074', '123-4567'],
        },
        peoplesoft: {
          employee_id: '188146',
          position_id: '00132136',
          department_id: '112-0074',
          organization_id: 'BC112',
        },
      },
    },
    update: {
      name: 'xxxx',
    },
  });

  const now = new Date();
  const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      sid: 'iHcbWqNHyasCGNOEThqpyORKtLU-wR4r',
      expire: oneDayFromNow.toISOString(),
      sess: {
        cookie: {
          path: '/',
          expires: oneDayFromNow.toISOString(),
          httpOnly: true,
          originalMaxAge: 24 * 60 * 60 * 1000,
        },
        passport: {
          user: {
            id: TEST_USER_ID,
            name: 'xxxx',
            roles: ['hiring-manager'],
            email: 'tuser@gov.bc.ca',
            metadata: {
              crm: {
                account_id: null,
                contact_id: 231166,
              },
              org_chart: {
                department_ids: ['112-0074', '123-4567'],
              },
              peoplesoft: {
                employee_id: '188146',
                position_id: '00132136',
                department_id: '112-0074',
                organization_id: 'BC112',
              },
            },
            username: 'TESTINGUSER',
            given_name: 'Test',
            family_name: 'User',
          },
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { id: '95cfdf78-95a5-4586-9a18-ff74aedd1ef2' },
    create: {
      id: '95cfdf78-95a5-4586-9a18-ff74aedd1ef2',
      name: "D'Cruz, George CITZ:EX",
      roles: ['hiring-manager'],
      metadata: {
        crm: {
          account_id: null,
          contact_id: 231166,
        },
        org_chart: {
          department_ids: ['112-0074', '123-4567', 'DEPT03'],
        },
        peoplesoft: {
          employee_id: '188147',
          position_id: '00132137',
          department_id: '112-0074',
          organization_id: 'BC112',
        },
      },
    },
    update: {
      name: "D'Cruz, George CITZ:EX",
    },
  });

  await prisma.user.upsert({
    where: { id: '0cd09b68-db66-4f29-9407-eba78d35230e' },
    create: {
      id: '0cd09b68-db66-4f29-9407-eba78d35230e',
      name: 'Struk, Alex CITZ:EX',
      roles: ['hiring-manager'],
      metadata: {
        crm: {
          account_id: null,
          contact_id: 231166,
        },
        org_chart: {
          department_ids: ['112-0074', '123-4567', 'DEPT03'],
        },
        peoplesoft: {
          employee_id: '188148',
          position_id: '00132138',
          department_id: '112-0074',
          organization_id: 'BC112',
        },
      },
    },
    update: {
      name: 'Struk, Alex CITZ:EX',
    },
  });

  await prisma.user.upsert({
    where: { id: '691c22b1-6c96-4d1a-8209-596b1811ca45' },
    create: {
      id: '691c22b1-6c96-4d1a-8209-596b1811ca45',
      name: 'Morgan, Hannah CITZ:EX',
      roles: ['hiring-manager'],
      metadata: {
        crm: {
          account_id: null,
          contact_id: 231166,
        },
        org_chart: {
          department_ids: ['112-0074', '123-4567', 'DEPT03'],
        },
        peoplesoft: {
          employee_id: '188149',
          position_id: '00132139',
          department_id: '123-4567',
          organization_id: 'BC112',
        },
      },
    },
    update: {
      name: 'Morgan, Hannah CITZ:EX',
    },
  });

  await prisma.jobProfileMinimumRequirements.createMany({
    data: [
      {
        id: 1,
        requirement: "Bachelor's or 2+ years in project management; PMP favorable.",
        grade: '09A',
      },
      {
        id: 2,
        requirement: 'Proficient in Adobe Suite with a compelling portfolio.',
        grade: '09A',
      },
      {
        id: 3,
        requirement: 'SEO/SEM experience with at least 1 year in digital marketing.',
        grade: '09A',
      },
      {
        id: 4,
        requirement: 'Strong communicator with CRM software proficiency.',
        grade: '09A',
      },
      {
        id: 5,
        requirement: 'Excellent interpersonal skills, extra languages beneficial.',
        grade: '11A',
      },
      {
        id: 6,
        requirement: 'Good with organizational tools and basic HR software.',
        grade: '11A',
      },
      {
        id: 7,
        requirement: 'Advanced Excel and SQL skills with an analytical approach.',
        grade: '11A',
      },
      {
        id: 8,
        requirement: 'Programming experience in Java or Python; strong problem solver.',
        grade: '11A',
      },
      {
        id: 9,
        requirement: 'Proven writing abilities with SEO understanding preferred.',
        grade: '11A',
      },
      {
        id: 10,
        requirement: 'Ability to manage multiple tasks; keen attention to detail.',
        grade: '13A',
      },
      {
        id: 11,
        requirement: 'Familiarity with cloud services (AWS, Google Cloud) a plus.',
        grade: '13A',
      },
      {
        id: 12,
        requirement: 'Basic graphic design skills; comfortable with Canva or similar.',
        grade: '13A',
      },
      {
        id: 13,
        requirement: 'Previous retail experience; excellent customer service skills.',
        grade: '13A',
      },
      {
        id: 14,
        requirement: 'Knowledge of social media platforms; content creation experience.',
        grade: '13A',
      },
      {
        id: 15,
        requirement: 'Familiar with Agile methodologies; Scrum certification desirable.',
        grade: '13A',
      },
      {
        id: 16,
        requirement: 'Comfortable with public speaking and presenting; PowerPoint proficient.',
        grade: '15A',
      },
      {
        id: 17,
        requirement: 'Data entry experience with high accuracy; typing speed of 60+ WPM.',
        grade: '15A',
      },
      {
        id: 18,
        requirement: 'Maintenance and troubleshooting of IT equipment; certification in IT support.',
        grade: '15A',
      },
      {
        id: 19,
        requirement: 'Experience in event planning and coordination; highly organized.',
        grade: '15A',
      },
      {
        id: 20,
        requirement: 'Basic understanding of web development; HTML/CSS skills.',
        grade: '15A',
      },
      {
        id: 21,
        requirement: 'Experience with video editing software; creative storytelling skills.',
        grade: '15A',
      },
      {
        id: 22,
        requirement: 'Background in finance or accounting; QuickBooks experience preferred.',
        grade: '18A',
      },
      {
        id: 23,
        requirement: 'Ability to work under pressure; flexible with changing priorities.',
        grade: '18A',
      },
      {
        id: 24,
        requirement: 'Strong research skills; ability to synthesize information quickly.',
        grade: '18A',
      },
      {
        id: 25,
        requirement: 'Proficient in project scheduling tools; detail-oriented planner.',
        grade: '18A',
      },
      {
        id: 26,
        requirement: 'Knowledge of e-commerce platforms; Shopify or WooCommerce experience.',
        grade: '18A',
      },
      {
        id: 27,
        requirement: 'Familiar with environmental regulations; sustainability passion a plus.',
        grade: '18A',
      },
      {
        id: 28,
        requirement: 'Experience in logistics and supply chain management; efficiency-focused.',
        grade: '18A',
      },
      {
        id: 29,
        requirement: 'Basic coding skills for data analysis; Python or R preferred.',
        grade: '21A',
      },
      {
        id: 30,
        requirement: 'Social media advertising experience; analytical and creative mindset.',
        grade: '21A',
      },
      {
        id: 31,
        requirement: 'Proficient in 3D modeling software; AutoCAD or Blender skills.',
        grade: '21A',
      },
      {
        id: 32,
        requirement: 'Strong negotiation skills; experience in procurement or sales.',
        grade: '21A',
      },
      {
        id: 33,
        requirement: 'Familiarity with GDPR and data privacy practices; legal background a plus.',
        grade: '21A',
      },
      {
        id: 34,
        requirement: 'Experience with educational software and e-learning platforms; teaching skills beneficial.',
        grade: '24A',
      },
      {
        id: 35,
        requirement: 'Proficient in mobile app development; iOS or Android experience.',
        grade: '24A',
      },
      {
        id: 36,
        requirement: 'Background in journalism; strong investigative and reporting skills.',
        grade: '24A',
      },
      {
        id: 37,
        requirement: 'Experience in healthcare administration; patient-oriented mindset.',
        grade: '24A',
      },
      {
        id: 38,
        requirement: 'Knowledge of cybersecurity best practices; certifications in security a plus.',
        grade: '24A',
      },
      {
        id: 39,
        requirement: 'Proficient in foreign languages; translation or interpretation experience.',
        grade: '27A',
      },
      {
        id: 40,
        requirement: 'Experience with podcast production; audio editing skills.',
        grade: '27A',
      },
      {
        id: 41,
        requirement: 'Strong understanding of cultural trends; marketing or anthropology background.',
        grade: '27A',
      },
      {
        id: 42,
        requirement: 'Ability to conduct technical training; IT certification training experience.',
        grade: '27A',
      },
      {
        id: 43,
        requirement: 'Experience in nonprofit fundraising; grant writing skills beneficial.',
        grade: '27A',
      },
    ],
  });

  await prisma.behaviouralCompetency.createMany({
    data: [
      {
        id: 1,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Vision and goal setting',
        description:
          'Vision and goal setting involves knowledge and skills in establishing official and operative goals for the organization/units and to establish a system of measuring effectiveness of goal attainment.',
      },
      {
        id: 2,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Designing strategy and structure',
        description:
          'involves knowledge and skills in the analysis of the environment, size of the organization, strategy and use of technology.',
      },
      {
        id: 3,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Creating and managing change',
        description:
          'involves knowledge and skills to manage in the organization through setting direction and urgency, building a coalition of support, communicating widely, handling resistance to change and facilitating implementation of successful change actions.',
      },
      {
        id: 4,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Corporate intrapreneurship',
        description:
          'focuses on venture creation, governance, differentiation and integration of new ventures within the organization.',
      },
      {
        id: 5,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Building strategic alliances',
        description:
          'involves knowledge and skills to engage in internal and external stakeholder analysis and to negotiate agreements and alliances based on a full understanding of power and politics.',
      },
      {
        id: 6,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Negotiating/conflict management',
        description:
          'involves knowledge and skills to engage in 2 party/multi-party negotiations and to facilitate third party intervention or mediation into conflict situations.',
      },
      {
        id: 7,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Communicating effectively',
        description:
          'involves good presentation skills (verbal and written), careful listening, problem framing and use of presentation technologies.',
      },
      {
        id: 8,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Handling crises',
        description: 'involves effectively managing risks and crises and handling public relations.',
      },
      {
        id: 9,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Motivating for peak performance',
        description:
          'involves knowledge and skills in using motivational techniques such as job design, role clarification, reward systems and performance appraisal to motivate optimum subordinate performance.',
      },
      {
        id: 10,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Promoting empowerment',
        description:
          'involves knowledge and skills in using processes such as delegation and information sharing to enhance subordinate ownership and empowerment over their task and performance.',
      },
      {
        id: 11,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Developing people',
        description:
          'involves knowledge and skills such as mentoring, performance evaluation and feedback, career planning and coaching to enhance subordinates growth and development.',
      },
      {
        id: 12,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Building team orientation',
        description:
          'involves knowledge and skills in developing group identity, participative decision making and open and effective communication.',
      },
      {
        id: 13,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Seeking and using feedback',
        description:
          'involves knowledge and skills of seeking and using feedback from other to improve one’s performance and authenticity. This requires active listening and modeling personal change in order to foster trust in the whole organization.',
      },
      {
        id: 14,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Fostering trust',
        description:
          'involves knowledge and skills to build and sustain trust in an organization and between the leader and his/her colleagues, through integrity, concern for others and consistent behaviour, following through on commitments and open communications.',
      },
      {
        id: 15,
        type: BehaviouralCompetencyType.EXCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Solving problems creatively',
        description:
          'involves knowledge and skills in fostering creative problem solving in the organization through critical reflection, problem analysis, risk assessment and rewarding innovation.',
      },
      {
        id: 16,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Analytical thinking',
        description:
          "is the ability to comprehend a situation by breaking it down into its components and identifying key or underlying complex issues. It implies the ability to systematically organize and compare the various aspects of a problem or situation and determine cause and effect relationships ('if...then…') to resolve problems in a sound, decisive manner. It checks to ensure the validity or accuracy of all information.",
      },
      {
        id: 17,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Business acumen',
        description:
          'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
      },
      {
        id: 18,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Conceptual thinking',
        description:
          'is the ability to identify patterns or connections between situations that are not obviously related and to identify key or underlying issues in complex situations. It includes using creative, conceptual or inductive reasoning or thought processes that are not necessarily categorized by linear thinking.',
      },
      {
        id: 19,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Decisive insight',
        description:
          'combines the ability to draw on one’s own experience, knowledge and training and effectively problem solve increasingly difficult and complex situations. It involves breaking down problems, tracing implications and recognizing patterns and connections that are not obviously related. It translates into identifying underlying issues and making the best decisions at the most appropriate time. At higher levels, the parameters upon which to base the decision become increasingly complex and ambiguous and call upon novel ways to think through issues.',
      },
      {
        id: 20,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Long-term focus',
        description:
          "combines reasoned and realistic judgement and commitment to key outcomes. It demands a blending of visionary thought and drive with pragmatism and perseverance and has been described as 'steering a steady course through uncharted or difficult waters.' Individuals with this competency have the ability to maintain the commitment of others and rely upon self-confidence and insight to meet individual, situational or organizational challenges.",
      },
      {
        id: 21,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Managing organizational resources',
        description:
          'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
      },
      {
        id: 22,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Planning, organizing and coordinating',
        description:
          "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
      },
      {
        id: 23,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Problem solving and judgement',
        description:
          'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
      },
      {
        id: 24,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Strategic orientation',
        description:
          'is the ability to link long range visions and concepts to daily work, ranging from a simple understanding to a sophisticated awareness of the impact of the world at large on strategies and on choices.',
      },
      {
        id: 25,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Concern for image impact',
        description:
          'is an awareness of how one’s self, one’s role and the organization are seen by others. The highest level of this competency involves an awareness of and preference for, respect for the organization by the community. Concern for image impact is particularly appropriate for senior management positions.',
      },
      {
        id: 26,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Conflict management',
        description:
          'is the ability to develop working relationships that facilitate the prevention and/or resolution of conflicts within the organization.',
      },
      {
        id: 27,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Customer/client development',
        description:
          "involves the genuine intent to foster the learning or development of a diverse clientele. 'Customers/clients' include the public, internal clients, colleagues, partners, coworkers, peers, branches, ministries/agencies and other government organizations.",
      },
      {
        id: 28,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Engaging external partners',
        description: 'identifies and involves external stakeholders in order to foster long term partnerships.',
      },
      {
        id: 29,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Impact/influence',
        description:
          'is the ability to influence, persuade, or convince others to adopt a specific course of action. It involves the use of persuasive techniques, presentations or negotiation skills to achieve desired results.',
      },
      {
        id: 30,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Information seeking',
        description:
          "is driven by a desire to know more about things, people, or issues. It implies going beyond the questions that are routine or required in the job. It may include 'digging' or pressing for exact information, resolution of discrepancies by asking a series of questions, or less focused environmental 'scanning' for potential opportunities or miscellaneous information that may be of future use.",
      },
      {
        id: 31,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Listening, understanding and responding',
        description:
          'is the desire and ability to understand and respond effectively to other people from diverse backgrounds. It includes the ability to understand accurately and respond effectively to both spoken and unspoken or partly expressed thoughts, feelings and concerns of others.',
      },
      {
        id: 32,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Organizational awareness',
        description:
          'is the acumen to appreciate and the ability to use the power relationships in either one’s own, or other, organization(s). This includes the ability to identify the real decision makers and the individuals who can influence them and to predict how new events or situations will affect individuals and groups within the organization.',
      },
      {
        id: 33,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Partners with stakeholders',
        description:
          'is the desire to work cooperatively with all stakeholders to meet mutual goals. It involves an awareness that a relationship based on trust is the foundation for success in delivering results.',
      },
      {
        id: 34,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Relationship building',
        description:
          'is working to build or maintain ethical relationships or networks or contacts with people who are, or may be, potentially helpful in achieving work related goals and establishing advantages. These people may include customers, clients, counterparts, colleagues, etc.',
      },
      {
        id: 35,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Service orientation',
        description:
          'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
      },
      {
        id: 36,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Teamwork and cooperation',
        description:
          'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
      },
      {
        id: 37,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Change leadership',
        description:
          'involves creating a new vision for the organization and taking the required actions to ensure that the members of the organization accept and support the vision. It generally requires the individual to be in a relatively senior or high level position, although this is not always the case.',
      },
      {
        id: 38,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Change management',
        description:
          'is the ability to support a change initiative that has been mandated within the organization. It involves helping the organization’s members understand what the change means to them and providing the ongoing guidance and support that will maintain enthusiasm and commitment to the change process. People with this competency willingly embrace and champion change. They take advantage of every opportunity to explain their vision of the future to others and gain their buy-in.',
      },
      {
        id: 39,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Developing others',
        description:
          'involves a genuine intent to foster the long term learning or development of others through coaching, managing performance and mentoring. Its focus is on developmental intent and effect rather than on a formal role of training. For this competency to be considered, the individual’s actions should be driven by a genuine desire to develop others, rather than by a need to transfer adequate skills to complete tasks.',
      },
      {
        id: 40,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Empowerment',
        description:
          'is the ability to share responsibility with individuals and groups so that they have a deep sense of commitment and ownership. People who practice empowerment participate and contribute at high levels, are creative and innovative, take sound risks, are willing to be held accountable and demonstrate leadership. They also foster teamwork among employees, across government and with colleagues and, as appropriate, facilitate the effective use of teams.',
      },
      {
        id: 41,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Holding people accountable',
        description:
          'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
      },
      {
        id: 42,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Leadership',
        description:
          "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
      },
      {
        id: 43,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Building partnerships with stakeholders',
        description:
          "is the ability to build long term or ongoing relationships with stakeholders (for example: someone who shares an interest in what you're doing). This type of relationship is often quite deliberate and is typically focused on the way the relationship is conducted. Implicit in this competency is demonstrating a respect for and stating positive expectations of the stakeholder.",
      },
      {
        id: 44,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Commitment to continuous learning',
        description:
          'involves a commitment to think about the ongoing and evolving needs of the organization and to learn how new and different solutions can be utilized to ensure success and move the organization forward.',
      },
      {
        id: 45,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Concern for order',
        description:
          "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
      },
      {
        id: 46,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Continuous development',
        description:
          'involves proactively taking actions to improve personal capability. It also involves being willing to assess one’s own level of development or expertise relative to one’s current job, or as part of focused career planning.',
      },
      {
        id: 47,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Expertise',
        description:
          'includes the motivation to expand and use technical knowledge or to distribute work related knowledge to others.',
      },
      {
        id: 48,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Flexibility',
        description:
          'is the ability and willingness to adapt to and work effectively within a variety of diverse situations and with diverse individuals or groups. Flexibility entails understanding and appreciating different and opposing perspectives on an issue, adapting one’s approach as situations change and accepting changes within one’s own job or organization.',
      },
      {
        id: 49,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Improving operations',
        description:
          'is the ability and motivation to apply one’s knowledge and past experience for improving upon current modes of operation within the ministry. This behaviour ranges from adapting widely used approaches to developing entirely new value added solutions.',
      },
      {
        id: 50,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Initiative',
        description:
          'involves identifying a problem, obstacle or opportunity and taking appropriate action to address current or future problems or opportunities. As such, initiative can be seen in the context of proactively doing things and not simply thinking about future actions. Formal strategic planning is not included in this competency.',
      },
      {
        id: 51,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Innovation',
        description:
          'indicates an effort to improve performance by doing or promoting new things, such as introducing a previously unknown or untried solution or procedure to the specific area or organization.',
      },
      {
        id: 52,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Integrity',
        description:
          "refers to actions that are consistent with what one says are important. People with integrity 'walk the talk' by communicating intentions, ideas and feelings openly and directly and welcoming openness and honesty even in difficult negotiations.",
      },
      {
        id: 53,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Organizational commitment',
        description:
          'is the ability and willingness to align one’s own behaviour with the needs, priorities and goals of the organization and to promote organizational goals to meet organizational needs. It also includes acting in accordance with organizational decisions and behaving with integrity.',
      },
      {
        id: 54,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Reflecting on difficulties',
        description:
          "is the willingness to 'work through' the personal experience of having contributed to an unsuccessful outcome. It's expressed by how individuals explain problems, failures, or negative events and what they have learned from those difficulties.",
      },
      {
        id: 55,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Results orientation',
        description:
          'is a concern for surpassing a standard of excellence. The standard may be one’s own past performance (striving for improvement), an objective measure (achievement orientation), challenging goals that one has set, or even improving or surpassing what has already been done (continuous improvement). Thus, a unique accomplishment also indicates a results orientation.',
      },
      {
        id: 56,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Self-confidence',
        description:
          'is a belief in one’s own capability to accomplish a task and select an effective approach to a task or problem. This includes confidence in one’s ability as expressed in increasingly challenging circumstances and confidence in one’s decision or opinions.',
      },
      {
        id: 57,
        type: BehaviouralCompetencyType.INCLUDED,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Self-control',
        description:
          'is the ability to keep one’s emotions under control and restrain negative actions when provoked, faced with opposition or hostility from others, or when working under stress. It also includes the ability to maintain stamina under continuing stress.',
      },
      {
        id: 58,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Collaborative Planning, Organizing & Coordinating',
        description:
          'involves shared planning, establishing priorities jointly and assigning resources accordingly, with sensitivity to the competing demands faced by Indigenous peoples. It is expressed by building plans together prior to acting, and ensuring that plans and resourcing align with their evolving interests and needs. It involves timely monitoring, evaluation and work refinement to deliver on the BC Public Service mandate of supporting Indigenous self-determination. It means developing staff orientation and managing knowledge so that when a new employee takes up a position within an already established relationship, educating the employee does not automatically and continually fall to Indigenous people.',
      },
      {
        id: 59,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Managing Organizational Resources',
        description:
          'is the ability to creatively think about allocation of organizational resources (e.g., people, materials, assets, funding) to support the self-determination of Aboriginal people. It may involve taking strategic risks with organizational resources, and incorporating ingenuity to maximize results. It includes the ability to look for improvements that do not require significant resourcing while committing to fully resourcing when indicated. It is collaborating with Aboriginal people to ensure that resources are allocated based on existing and further interests of their people and communities. It incorporates a means of measuring results relevant to both the BC Public Service and Aboriginal people.',
      },
      {
        id: 60,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Process Orientation',
        description:
          'places a priority on how things are done. It is a willingness to remain open and follow in new directions. It means setting aside mainstream ways of achieving results and instead following culturally respectful processes that also produce results. It is letting go of agendas or the need to control, and trusting that the appropriate outcome will emerge from a good journey together. It means accepting that both the use of process orientation and a good relationship are concrete results.',
      },
      {
        id: 61,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.ACHIEVING_BUSINESS_RESULTS,
        name: 'Strategic Orientation',
        description:
          'is the ability to link the long-range vision of Indigenous self-determination to daily work, ranging from a simple understanding to a sophisticated awareness of the full impact of thinking and actions. It is the ability to think and operate broadly, with the goal of sustainability, to further the goals of Indigenous peoples in a way that meets the collective public interest. This also means taking responsibility to collaboratively design and implement steps to redress past harms and set frameworks in place to prevent their recurrence.',
      },
      {
        id: 62,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Building a Trust-based Relationship',
        description:
          'requires a fundamental understanding that "relationship" is the foundation from which all activities happen and that building a good relationship takes time and commitment. It is a willingness to build a personal relationship in addition to a professional one, participating in open exchanges of experiences and culture. It requires a genuine, non-controlling approach and relies upon demonstrated integrity and transparency. Building a trust-based relationship requires a high level of consciousness of the experience of Indigenous people with Crown relations. It assumes that strengths abound in Indigenous people, cultures and communities.',
      },
      {
        id: 63,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Cultural Agility',
        description:
          "is the ability to work respectfully, knowledgeably and effectively with Indigenous people. It is noticing and readily adapting to cultural uniqueness in order to create a sense of safety for all. It is openness to unfamiliar experiences, transforming feelings of nervousness or anxiety into curiosity and appreciation. It is examining one's own culture and worldview and the culture of the BC Public Service, and to notice their commonalities and distinctions with Indigenous cultures and worldviews. It is recognition of the ways that personal and professional values may conflict or align with those of Indigenous people. It is the capacity to relate to or allow for differing cultural perspectives and being willing to experience a personal shift in perspective.",
      },
      {
        id: 64,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Empowering Others',
        description:
          "means making a systematic and sustained effort to provide Indigenous people with information, knowledge, support and opportunities to be self-determined, based upon the individual or community's level of acceptance towards moving forward. An important step is acknowledging past mistakes and encouraging movement towards a positive future, at a pace and degree determined by Indigenous people. It also means taking action with employees within the public service so that they become empowered and engaged in respectful, effective Indigenous relations.",
      },
      {
        id: 65,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Indigenous Centred Service Approach',
        description:
          "is a desire to serve Indigenous peoples, focusing one's efforts on understanding their interests in order to increase the quality of the service and produce better outcomes. It implies a willingness to support Indigenous peoples in determining their own future. It involves demonstrating a welcoming demeanour, an attitude of helpful curiosity and a willingness to enter into the interaction or relationship without judgment or stereotyping. It means being open-minded and flexible in one's attitudes toward people who are different from oneself and showing respect for the differences. It includes experiencing Indigenous peoples as strong, vital and important to the functioning of British Columbia. Implicit in this is the knowledge that one is responsible for the image and effectiveness of the public service.",
      },
      {
        id: 66,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.INTERPERSONAL_RELATIONSHIPS,
        name: 'Promoting Accord',
        description:
          'involves exploring perspectives and underlying interests to reach outcomes that gain the acceptance of all parties. It is allowing Indigenous people the time, space and capacity to reach outcomes from their traditional decision-making practice. It is being willing to put the problem in the centre to work together on an outcome, rather than "competing" to win. It means making the assumption that everyone involved wants to work together and get the best result for all. It is thinking sideways into another perspective and valuing it as strongly as one\'s own, focusing on strengths and possibilities. It includes behaving in an honest, open way, and expressing organizational limitations (e.g. funding, time, staffing) up front so that all information is available when working towards agreement. It requires excellent communication skills.',
      },
      {
        id: 67,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Change Leadership',
        description:
          'is championing the achievement of intended, real change that meets the enduring vision of Indigenous self-determination in British Columbia. It involves collaboratively developing and implementing ideas to achieve positive change from anywhere in the BC Public Service. The change leader learns from other leaders and elders, models the vision and encourages members of the public service to commit to and champion the vision. The change leader inspires others into new ways of thinking and doing business. The change leader routinely energizes the change process and removes barriers to change.',
      },
      {
        id: 68,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.LEADING_PEOPLE,
        name: 'Credible Champion',
        description:
          'shows courage and conviction in advocating for change for the betterment of Indigenous peoples. This means stepping forward, from a place of respect and knowledge, to name needed change and to champion it. This may mean challenging current business practices and attitudes. A credible champion is admired and respected by Indigenous peoples and BC Public Service employees, is deeply knowledgeable in the culture of those with whom s/he works, and demonstrates outstanding performance as identified by Indigenous people and the public service. A credible champion remains self-aware and maintains effective relationships.',
      },
      {
        id: 69,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Commitment',
        description:
          'is visibly putting into action your stated commitments. It means "walking the talk" and following through. It includes communicating information and intentions openly, honestly and regularly, and welcoming the same in others. It is consistently demonstrating ethical behaviour (such as honouring confidentiality and speaking the truth) so that Indigenous people know what to expect and can trust that action will follow your statement of commitment. It also means anticipating the level of knowledge and understanding needed and proactively gaining the knowledge prior to entering into relationships with Indigenous  people.',
      },
      {
        id: 70,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Empathy',
        description:
          "is the ability to recognize, understand and directly experience the emotion of another. It involves listening with heart, accepting their message and staying focused on their experience rather than reacting. It means understanding that the behaviour may be connected to something outside of the immediate situation. (Sympathy is not empathy. Sympathy means feeling pity and sorrow for someone's misfortune, or the tendency to want to help them with what you see as something negative. This can send a message that you believe that others cannot arrive at their own solutions.)",
      },
      {
        id: 71,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Ingenuity',
        description:
          "is the quality of being inventive and creative when faced with a variation in BC Public Service objectives and those of Indigenous peoples. It involves dealing with problems in original and creative ways that seek commonalities and links rather than gaps and differences. It is approaching issues with a willingness to question one's assumptions and to take risks outside of common ways of thinking and doing. The value of courage may be strongly demonstrated when using ingenuity.",
      },
      {
        id: 72,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Open Listening',
        description:
          "is letting go of conventional means of listening. It means listening to and valuing the telling of stories, and letting pauses in conversation extend into silence rather than jumping in to dispute, agree, question or move on. It is an awareness of personal bias or judgment and its effect on one's ability to hear. It is the desire and ability to set aside physical, mental and emotional distractions in order to be fully focused and listening respectfully and openly. It is staying open to the message even when conversations are filled with raw emotions like sadness or anger, and believing that each person's knowledge and reality is legitimate and valuable. Finally, it requires a willingness to reflect upon a story or message and to derive meaning from it based upon the situation in which it is shared.",
      },
      {
        id: 73,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Self-discovery & Awareness',
        description:
          "means understanding one's thoughts, feelings, values and background and how they impact the success of the interaction and relationship, or how they may influence one's work. It is recognizing one's own biases by tracing them to their origins, through reflection and by noticing one's own behaviour—and then intentionally seeking a way forward that positively impacts the interaction and relationship. It means maintaining new ways of thinking and acting when situations become difficult or uncertain, or in times of urgency.",
      },
      {
        id: 74,
        type: BehaviouralCompetencyType.INDIGENOUS,
        category: BehaviouralCompetencyCategory.PERSONAL_EFFECTIVENESS,
        name: 'Sustained Learning & Development',
        description:
          'means continually increasing your ability to build and maintain respectful and effective relationships with Indigenous peoples. Central to this competency is appreciating that there are many other cultural understandings of knowledge and ways of working that have legitimacy and deserve respect—and therefore require our continual learning and development, including direct exposure to cultural and community ways. It includes an eagerness to continually reflect upon and assess your own level of cultural agility and competence, self-awareness and expertise. It means being willing to learn in new and different ways and appreciating how diverse ways of thinking and acting can ensure the success of the BC Public Service in supporting Indigenous self-determination.',
      },
    ],
  });

  await prisma.jobProfileJobFamily.createMany({
    data: [
      { id: 1, name: 'Administrative Services' },
      { id: 2, name: 'Communications' },
      { id: 3, name: 'Compliance and Enforcement' },
      { id: 4, name: 'Court and Judicial Services' },
      { id: 5, name: 'Education Services' },
      { id: 6, name: 'Executive' },
      { id: 7, name: 'Finance' },
      { id: 8, name: 'Health Services' },
      { id: 9, name: 'Heritage Resource/Archaeology' },
      { id: 10, name: 'Human Resources' },
      { id: 11, name: 'Indigenous Relations' },
      { id: 12, name: 'Information Management/Information Technology' },
      { id: 13, name: 'Leadership and Management' },
      { id: 14, name: 'Policy, Research, and Economics' },
      { id: 15, name: 'Project Management' },
      { id: 16, name: 'Retail' },
      { id: 17, name: 'Scientific and Technical' },
      { id: 18, name: 'Social Services' },
      { id: 19, name: 'Students/Internships' },
      { id: 20, name: 'Trades and Operational' },
      { id: 21, name: 'Veterinary Services' },
      { id: 22, name: 'Information Management' },
      { id: 23, name: 'Information Technology and Digital Talent' },
      { id: 24, name: 'Legal Counsel' },
    ],
  });

  await prisma.jobProfileStream.createMany({
    data: [
      { id: 1, job_family_id: 1, name: 'Adjudication' },
      { id: 2, job_family_id: 1, name: 'Administrative Support' },
      { id: 3, job_family_id: 1, name: 'Application/Systems Administration' },
      { id: 4, job_family_id: 1, name: 'Business Continuity' },
      { id: 5, job_family_id: 1, name: 'Communications Support' },
      { id: 6, job_family_id: 1, name: 'Consulting Services' },
      { id: 7, job_family_id: 1, name: 'Executive Administrative Services' },
      { id: 8, job_family_id: 1, name: 'Facilities/Property Administration' },
      { id: 9, job_family_id: 1, name: 'Financial Administration' },
      { id: 10, job_family_id: 1, name: 'HR Administration' },
      { id: 11, job_family_id: 1, name: 'Office Administration' },
      { id: 12, job_family_id: 1, name: 'Program Review/Planning' },
      { id: 13, job_family_id: 1, name: 'Project Management Support' },
      { id: 14, job_family_id: 1, name: 'Records and Information Management' },
      { id: 15, job_family_id: 1, name: 'Training Administration' },
      { id: 16, job_family_id: 1, name: 'Warehouse Operations/Administration' },
      { id: 17, job_family_id: 2, name: 'Client Relations' },
      { id: 18, job_family_id: 2, name: 'Correspondence' },
      { id: 19, job_family_id: 2, name: 'Event Planning' },
      { id: 20, job_family_id: 2, name: 'Publications and Graphics' },
      { id: 21, job_family_id: 2, name: 'Writing' },
      { id: 22, job_family_id: 3, name: 'Enforcement' },
      { id: 23, job_family_id: 3, name: 'Correctional Services' },
      { id: 24, job_family_id: 3, name: 'Deputy Sheriff Services' },
      { id: 25, job_family_id: 3, name: 'Inspection' },
      { id: 26, job_family_id: 3, name: 'Investigation' },
      { id: 27, job_family_id: 4, name: 'Legal Administration and Management' },
      { id: 28, job_family_id: 4, name: 'Legal Counsel' },
      { id: 29, job_family_id: 4, name: 'Paralegal Services' },
      { id: 30, job_family_id: 5, name: 'Educational Officers' },
      { id: 31, job_family_id: 7, name: 'Accounting' },
      { id: 32, job_family_id: 7, name: 'Auditing' },
      { id: 33, job_family_id: 7, name: 'Budgeting' },
      { id: 34, job_family_id: 7, name: 'Procurement' },
      { id: 35, job_family_id: 7, name: 'Revenue Management' },
      { id: 36, job_family_id: 7, name: 'Risk Management' },
      { id: 37, job_family_id: 8, name: 'Dietician Services' },
      { id: 38, job_family_id: 8, name: 'Health Support' },
      { id: 39, job_family_id: 8, name: 'Health Therapy' },
      { id: 40, job_family_id: 8, name: 'Nursing' },
      { id: 41, job_family_id: 8, name: 'Pharmacy' },
      { id: 42, job_family_id: 8, name: 'Psychology' },
      { id: 43, job_family_id: 9, name: 'Heritage Resource Officer' },
      { id: 44, job_family_id: 10, name: 'Consulting' },
      { id: 45, job_family_id: 10, name: 'Hiring Administration' },
      { id: 46, job_family_id: 10, name: 'Talent Management' },
      { id: 47, job_family_id: 10, name: 'Total Compensation' },
      { id: 48, job_family_id: 10, name: 'Training' },
      { id: 49, job_family_id: 10, name: 'Workforce Planning' },
      { id: 50, job_family_id: 12, name: 'Archival Services' },
      { id: 51, job_family_id: 12, name: 'Information Management' },
      { id: 52, job_family_id: 12, name: 'Information Services/Technology' },
      { id: 53, job_family_id: 14, name: 'Data Science' },
      { id: 54, job_family_id: 14, name: 'Economics' },
      { id: 55, job_family_id: 14, name: 'Policy' },
      { id: 56, job_family_id: 14, name: 'Program Review and Planning' },
      { id: 57, job_family_id: 14, name: 'Research and Statistics' },
      { id: 58, job_family_id: 15, name: 'Project Management' },
      { id: 59, job_family_id: 16, name: 'Marketing and Sales' },
      { id: 60, job_family_id: 16, name: 'Retail Operations' },
      { id: 61, job_family_id: 16, name: 'Warehouse Operations' },
      { id: 62, job_family_id: 17, name: 'Agrology' },
      { id: 63, job_family_id: 17, name: 'Biology' },
      { id: 64, job_family_id: 17, name: 'Emergency Management' },
      { id: 65, job_family_id: 17, name: 'Engineering' },
      { id: 66, job_family_id: 17, name: 'Geomatics' },
      { id: 67, job_family_id: 17, name: 'Geoscience' },
      { id: 68, job_family_id: 17, name: 'Laboratory Services		' },
      { id: 69, job_family_id: 17, name: 'Resource Management' },
      { id: 70, job_family_id: 18, name: 'Adoptions/Guardianship' },
      { id: 71, job_family_id: 18, name: 'Child Protection' },
      { id: 72, job_family_id: 18, name: 'Family Justice' },
      { id: 73, job_family_id: 18, name: 'Financial Assistance Services' },
      { id: 74, job_family_id: 18, name: 'Forensic' },
      { id: 75, job_family_id: 18, name: 'Mental Health Services' },
      { id: 76, job_family_id: 18, name: 'Nursing' },
      { id: 77, job_family_id: 18, name: 'Probation' },
      { id: 78, job_family_id: 18, name: 'Psychology' },
      { id: 79, job_family_id: 18, name: 'Resource Services' },
      { id: 80, job_family_id: 18, name: 'Victims Services' },
      { id: 81, job_family_id: 19, name: 'Coop Student' },
      { id: 82, job_family_id: 19, name: 'Equity and Diversity Internship' },
      { id: 83, job_family_id: 19, name: 'Indigenous Youth internship Program' },
      { id: 84, job_family_id: 19, name: 'Work-able' },
      { id: 85, job_family_id: 19, name: 'Youth Employment Program' },
      { id: 86, job_family_id: 21, name: 'Veterinarians' },
      { id: 87, job_family_id: 22, name: 'Archival' },
      { id: 88, job_family_id: 23, name: 'Business Analysis' },
      { id: 89, job_family_id: 22, name: 'Data Management' },
      { id: 90, job_family_id: 22, name: 'Records Management' },
      { id: 91, job_family_id: 23, name: 'Data/Database Administration' },
      { id: 92, job_family_id: 23, name: 'Digital Talent - Dev Ops' },
      { id: 93, job_family_id: 23, name: 'Digital Talent - Developers' },
      { id: 94, job_family_id: 23, name: 'Digital Talent - Product Managers' },
      { id: 95, job_family_id: 23, name: 'Digital Talent - Scrum Masters' },
      { id: 96, job_family_id: 23, name: 'Digital Talent - Service Design' },
      { id: 97, job_family_id: 23, name: 'Digital Talent - Site Reliability' },
      { id: 98, job_family_id: 23, name: 'Digital Talent - User Experience' },
      { id: 99, job_family_id: 23, name: 'Engineering/Architecture' },
      { id: 100, job_family_id: 23, name: 'Governance' },
      { id: 101, job_family_id: 23, name: 'Helpdesk' },
      { id: 102, job_family_id: 23, name: 'Management' },
      { id: 103, job_family_id: 23, name: 'Network' },
      { id: 104, job_family_id: 23, name: 'Programming and Software' },
      { id: 105, job_family_id: 23, name: 'Security' },
      { id: 106, job_family_id: 23, name: 'Service Management' },
      { id: 107, job_family_id: 23, name: 'Technical Analysis' },
      { id: 108, job_family_id: 23, name: 'Web Design' },
      { id: 109, job_family_id: 22, name: 'Freedom of Information (FOI)' },
      { id: 110, job_family_id: 1, name: 'Customer Service' },
      { id: 111, job_family_id: 3, name: 'Administrative Compliance' },
      { id: 112, job_family_id: 10, name: 'Diversity, Equity and Inclusion' },
      { id: 113, job_family_id: 10, name: 'Employee Relations' },
      { id: 114, job_family_id: 10, name: 'HR Policy' },
      { id: 115, job_family_id: 10, name: 'Job Classification' },
      { id: 116, job_family_id: 10, name: 'Labour Relations' },
      { id: 117, job_family_id: 10, name: 'Leadership Development/Coaching' },
      { id: 118, job_family_id: 10, name: 'Organizational Development' },
      { id: 119, job_family_id: 10, name: 'Performance Management' },
      { id: 120, job_family_id: 10, name: 'Workplace Health and Safety' },
      { id: 121, job_family_id: 11, name: 'Consultation' },
      { id: 122, job_family_id: 11, name: 'Issues Management' },
      { id: 123, job_family_id: 11, name: 'Negotiation' },
      { id: 124, job_family_id: 15, name: 'Change Management' },
      { id: 125, job_family_id: 17, name: 'Forestry' },
      { id: 126, job_family_id: 17, name: 'Planning' },
      { id: 127, job_family_id: 17, name: 'Research' },
      { id: 128, job_family_id: 24, name: 'Justice Services' },
      { id: 129, job_family_id: 24, name: 'Legal Services' },
      { id: 130, job_family_id: 24, name: 'Other' },
      { id: 131, job_family_id: 24, name: 'Prosecution Services' },
    ],
  });

  await prisma.jobProfileRole.createMany({
    data: [
      {
        id: 1,
        name: 'Operational/Administration',
      },
      {
        id: 2,
        name: 'Technical',
      },
      {
        id: 3,
        name: 'Professional',
      },
      {
        id: 4,
        name: 'Expert',
      },
      {
        id: 5,
        name: 'Management',
      },
    ],
  });

  await prisma.jobProfileRoleType.createMany({
    data: [
      {
        id: 1,
        name: 'Individual Contributor',
      },
      {
        id: 2,
        name: 'People Leader',
      },
    ],
  });

  await prisma.jobProfileScope.createMany({
    data: [
      { id: 1, name: 'Division focus', description: 'ADM level' },
      { id: 2, name: 'Ministry focus', description: 'DM or Associate DM level' },
      { id: 3, name: 'Program', description: 'Work supports program and/or services delivery ' },
      {
        id: 4,
        name: 'Region/District',
        description:
          'Geographic area of responsibility under a Regional Director, District Manager and or Provincial Director',
      },
      { id: 5, name: 'Sector focus', description: 'A group of ministries' },
      {
        id: 6,
        name: 'Zone/Office',
        description: 'Geographic area of responsibility under a RD/DM and/or Provincial Dir',
      },
      { id: 7, name: 'Public Service', description: 'Government-wide responsibility' },
    ],
  });

  const employeeGroups = {
    data: [
      { id: 'GEU', name: "BC General Employees' Union" },
      { id: 'MGT', name: 'Management' },
      { id: 'OEX', name: 'Schedule A' },
      { id: 'PEA', name: 'Professional Employees Association' },
      { id: '805G', name: '805G' },
      { id: 'LBS', name: 'LBS' },
      { id: 'VAR', name: 'VAR' },
      { id: 'CEB', name: 'CEB' },
      { id: 'TIC', name: 'TIC' },
      { id: 'LAZ', name: 'LAZ' },
      { id: 'OPP', name: 'OPP' },
      { id: 'INU', name: 'INU' },
      { id: 'NUR', name: 'Nursing' },
      { id: 'CA', name: 'CA' },
      { id: 'OPZ', name: 'OPZ' },
      { id: 'OPB', name: 'OPB' },
      { id: 'TIN', name: 'TIN' },
      { id: 'LKH', name: 'LKH' },
      { id: 'OPQ', name: 'OPQ' },
      { id: 'OPC', name: 'OPC' },
      { id: 'LAF', name: 'LAF' },
      { id: 'PL', name: 'PL' },
      { id: 'LIN', name: 'LIN' },
      { id: 'OPF', name: 'OPF' },
      { id: 'TEK', name: 'TEK' },
      { id: 'PLC', name: 'PLC' },
      { id: 'LA', name: 'LA' },
      { id: 'TEF', name: 'TEF' },
      { id: 'LPB', name: 'LPB' },
      { id: 'OP', name: 'OP' },
      { id: 'CAP', name: 'CAP' },
      { id: 'CAB', name: 'CAB' },
      { id: 'CAK', name: 'CAK' },
      { id: 'OIN', name: 'OIN' },
      { id: 'IRI', name: 'IRI' },
      { id: 'PAI', name: 'PAI' },
      { id: 'IR', name: 'IR' },
      { id: 'INBC', name: 'INBC' },
      { id: 'LAQ', name: 'LAQ' },
      { id: 'TEQ', name: 'TEQ' },
      { id: 'PLH', name: 'PLH' },
      { id: 'OPK', name: 'OPK' },
      { id: 'CE', name: 'CE' },
      { id: 'LLM', name: 'LLM' },
      { id: 'FSA', name: 'FSA' },
      { id: 'OF', name: 'OF' },
      { id: 'LAB', name: 'LAB' },
      { id: 'CRN', name: 'CRN' },
      { id: 'SH', name: 'SH' },
      { id: 'LAP', name: 'LAP' },
      { id: 'BCU', name: 'BCU' },
      { id: 'PHY', name: 'PHY' },
      { id: 'QP', name: 'QP' },
      { id: 'NEX', name: 'NEX' },
      { id: 'LGL', name: 'LGL' },
      { id: 'MLA', name: 'MLA' },
      { id: 'TS', name: 'TS' },
      { id: '805M', name: '805M' },
      { id: 'POI', name: 'POI' },
      { id: '805N', name: '805N' },
      { id: 'SAT', name: 'SAT' },
      { id: 'SGEU', name: 'SGEU' },
      { id: '805P', name: '805P' },
      { id: 'TOEX', name: 'TOEX' },
      { id: 'TMGT', name: 'TMGT' },
      { id: 'AOEX', name: 'AOEX' },
      { id: 'AMGT', name: 'AMGT' },
      { id: 'TGEU', name: 'TGEU' },
      { id: 'HEA', name: 'HEA' },
      { id: 'PBC', name: 'PBC' },
      { id: 'PAR', name: 'PAR' },
      { id: 'CLU', name: 'CLU' },
      { id: 'SYS', name: 'SYS' },
      { id: 'SRS', name: 'SRS' },
      { id: 'QPA', name: 'QPA' },
      { id: '', name: '' },
    ],
  };

  for (const group of employeeGroups.data) {
    try {
      // console.log('Creating group:', group);
      await prisma.employeeGroup.create({
        data: group,
      });
    } catch (error) {
      console.error('Failed to create group:', group.id, error);
    }
  }

  // Job Profiles, Behavioural Competencies and Reporting Relationships
  const bcProfile194 = [45, 22, 36];
  const bcProfile200 = [45, 41, 22];
  const bcProfile208 = [45, 41, 22];
  const bcProfile189 = [45, 35, 36];
  const bcProfile210 = [17, 21, 23, 22];
  const bcProfile212 = [17, 21, 23, 22];
  const bcProfile247 = [17, 21, 23, 22, 42];

  // fetch competencies and return them in a JSON structure
  async function getCompetencies(ids) {
    const competencies = await prisma.behaviouralCompetency.findMany({ where: { id: { in: ids } } });
    return competencies.map((bc) => ({
      id: bc.id,
      name: bc.name,
      description: bc.description,
      category: bc.category,
      type: bc.type,
    }));
  }
  const profile189: JobProfile = {
    id: 4,
    behavioural_competencies: await getCompetencies(bcProfile189),
    optional_requirements: [],
    review_required: false,
    program_overview: '',
    professional_registration_requirements: [],
    preferences: [],
    knowledge_skills_abilities: [],
    willingness_statements: [],
    security_screenings: [],
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    is_archived: false,
    role_id: 1,
    role_type_id: null,
    type: 'CORPORATE',
    state: 'PUBLISHED',
    title: 'Senior Software Engineer',
    number: 189,
    overview: 'Senior Software Engineer responsible for developing scalable web applications.',
    context:
      'The position often collaborates closely with the IT department to ensure the security and efficiency of data management systems, receiving technical support as needed.',
    accountabilities: [
      { text: 'Design, develop, and maintain web applications.', is_significant: false, is_readonly: false },
      {
        text: 'Ensure the performance, quality, and responsiveness of applications.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Collaborate with a team to define, design, and ship new features.',
        is_significant: false,
        is_readonly: false,
      },
      { text: 'Identify and correct bottlenecks and fix bugs.', is_significant: false, is_readonly: false },
      {
        text: 'Ensure compliance with security and data protection regulations.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Engage with stakeholders to gather and define requirements.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Manage project timelines and deliverables.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Troubleshoot and debug applications to optimize performance.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Stay updated with the latest in technology and incorporate it into our platforms.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Conduct code reviews and ensure software quality standards are met.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Mentor junior developers and promote best coding practices.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Ensure the performance, quality, and responsiveness of applications.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: false,
        text: "Bachelor's degree in Computer Science, Information Technology, or related field.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: "Master's or PhD in Computer Science or a related field preferred.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Certifications in software development, project management, or related fields.',
      },
    ],
    job_experience: [],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 1,
  };

  const profile194: JobProfile = {
    id: 1,
    behavioural_competencies: await getCompetencies(bcProfile194),
    optional_requirements: [],
    review_required: false,
    program_overview: '',
    professional_registration_requirements: [],
    preferences: [],
    knowledge_skills_abilities: [],
    willingness_statements: [],
    security_screenings: [],
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    is_archived: false,
    role_id: 1,
    role_type_id: null,
    type: 'CORPORATE',
    state: 'PUBLISHED',
    title: 'Data Scientist',
    number: 194,
    overview:
      'Data Scientist responsible for analyzing large data sets to derive actionable insights and support strategic decision-making.',
    context:
      "This role is directly accountable to the Senior Marketing Manager, who oversees the marketing department's strategies and execution, offering strategic guidance and performance feedback.",

    accountabilities: [
      {
        text: 'Work with stakeholders to understand business requirements and deliver data-driven solutions.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Develop and implement databases, data collection systems, data analytics, and other strategies that optimize statistical efficiency and quality.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Collect, process, and clean data from various sources to prepare it for analysis.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Use statistical methods to analyze data and generate useful business reports.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Identify, analyze, and interpret trends or patterns in complex data sets.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Develop predictive models and machine-learning algorithms to support business decisions.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Present data and insights to stakeholders using visualization tools.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Collaborate with engineering and product development teams.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Monitor and assess the effectiveness of data and analytics strategies.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Ensure compliance with data governance and security policies.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: false,
        text: "Bachelor's degree in Data Science, Statistics, Mathematics, Computer Science, or related field.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: "Master's degree or PhD in Data Science, Applied Mathematics, or a related quantitative field preferred.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Certifications in data science, big data analytics, or related fields.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Proven record of engaging in professional development courses in machine learning, data analysis, and statistical modeling.',
      },
    ],
    job_experience: [],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 1,
  };

  const profile200: JobProfile = {
    id: 2,
    behavioural_competencies: await getCompetencies(bcProfile200),
    optional_requirements: [],
    review_required: false,
    program_overview: '',
    professional_registration_requirements: [],
    preferences: [],
    knowledge_skills_abilities: [],
    willingness_statements: [],
    security_screenings: [],
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    is_archived: false,
    role_id: 1,
    role_type_id: null,
    state: 'PUBLISHED',
    type: 'CORPORATE',
    title: 'Project Manager',
    number: 200,
    overview:
      'Experienced Project Manager to lead cross-functional teams in the successful delivery of high-stake projects.',
    context:
      "The employee will work under the guidance of the Chief Financial Officer, who is responsible for the company's financial health and provides direction on budget management and financial planning.",

    accountabilities: [
      {
        text: 'Define project scope, goals, and deliverables that support business goals.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Develop full-scale project plans and associated communication documents.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Effectively communicate project expectations to team members and stakeholders.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Delegate tasks and responsibilities to appropriate personnel.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Identify and resolve issues and conflicts within the project team.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Plan, schedule, and track project timelines, milestones, and deliverables.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Develop and deliver progress reports, proposals, requirements documentation, and presentations.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Determine the frequency and content of status reports from the project team.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Perform risk management to minimize project risks.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Establish and maintain relationships with third parties/vendors.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Monitor and adjust project plans and operations as needed.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Secure acceptance and approval of deliverables from stakeholders.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Ensure project documents are complete, current, and stored appropriately.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Manage project budget and resource allocation.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Facilitate team meetings effectively and ensure project deadlines are met.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: false,
        text: "Bachelor's degree in Business Administration, Management, Computer Science, or related field.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: "Master's degree in Project Management, Business, or related field preferred.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Certification in Project Management (PMP, PRINCE2, Agile, or equivalent).',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Additional certifications related to industry-specific project management.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Continuous education in project management tools and techniques.',
      },
    ],
    job_experience: [],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 10,
  };

  const profile208: JobProfile = {
    id: 3,
    behavioural_competencies: await getCompetencies(bcProfile208),
    optional_requirements: [],
    review_required: false,
    program_overview: '',
    professional_registration_requirements: [],
    preferences: [],
    knowledge_skills_abilities: [],
    willingness_statements: [],
    security_screenings: [],
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    is_archived: false,
    role_id: 1,
    role_type_id: null,
    state: 'PUBLISHED',
    type: 'CORPORATE',
    title: 'Dynamic Digital Marketing Specialist',
    number: 208,
    overview:
      'Dynamic Digital Marketing Specialist to develop, implement, track, and optimize our digital marketing campaigns across multiple programs and all digital channels.',
    context:
      'The role frequently interfaces with external vendors and partners, coordinating with the Procurement Manager to negotiate contracts and manage supplier relationships effectively.',
    accountabilities: [
      {
        text: 'Plan and execute all web, SEO/SEM, database marketing, email, social media, and display advertising campaigns.',
        is_significant: false,
        is_readonly: false,
      },
      { text: 'Design, build, and maintain our social media presence.', is_significant: false, is_readonly: false },
      {
        text: 'Measure and report performance of all digital marketing campaigns, and assess against goals (ROI and KPIs).',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Identify trends and insights, and optimize spend and performance based on the insights.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Brainstorm new and creative growth strategies through digital marketing.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Plan, execute, and measure experiments and conversion tests.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Collaborate with internal teams to create landing pages and optimize user experience.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Utilize strong analytical ability to evaluate end-to-end customer experience across multiple channels and customer touchpoints.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Instrument conversion points and optimize user funnels.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Collaborate with agencies and other vendor partners.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Evaluate emerging technologies. Provide thought leadership and perspective for adoption where appropriate.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Develop and oversee A/B and multivariate tests to improve conversion rates.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Manage the strategy and setup of all paid campaigns.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: false,
        text: "Bachelor's degree in Marketing, Digital Media, or related field.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: "Master's degree in Marketing or related field preferred.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Certifications in Google Analytics, Google Ads, HubSpot, or other digital marketing tools.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Continuous learning through workshops, webinars, and courses in digital marketing and related technologies.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Strong grasp of current marketing tools and strategies and able to lead integrated digital marketing campaigns from concept to execution.',
      },
    ],
    job_experience: [],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 74,
  };

  const profile210: JobProfile = {
    id: 5,
    behavioural_competencies: await getCompetencies(bcProfile210),
    optional_requirements: [],
    review_required: false,
    program_overview: '',
    professional_registration_requirements: [],
    preferences: [],
    knowledge_skills_abilities: [],
    willingness_statements: [],
    security_screenings: [],
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    is_archived: false,
    role_id: 1,
    role_type_id: null,
    state: 'PUBLISHED',
    type: 'CORPORATE',
    title: 'Strategic HR Analyst Manager',
    number: 210,
    overview:
      'Strategic HR Analyst Manager to lead multiple programs for our HR practices and objectives that will provide an employee-oriented, high-performance culture emphasizing empowerment, quality, productivity, and standards.',
    context:
      'Team members report to the Project Lead, who coordinates project tasks and timelines, ensuring alignment with client expectations and project goals.',
    accountabilities: [
      {
        text: 'Develop and implement HR strategies and initiatives aligned with the overall business strategy.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Bridge management and employee relations by addressing demands, grievances, or other issues.',
        is_significant: false,
        is_readonly: false,
      },
      { text: 'Manage the recruitment and selection process.', is_significant: false, is_readonly: false },
      {
        text: 'Support current and future business needs through the development, engagement, motivation, and preservation of human capital.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Develop and monitor overall HR strategies, systems, tactics, and procedures across the organization.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Nurture a positive working environment.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Oversee and manage a performance appraisal system that drives high performance.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Maintain pay plan and benefits program.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Assess training needs to apply and monitor training programs.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Ensure legal compliance throughout human resource management.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Manage HR staff and respond to employee queries.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Develop and revise HR policies and documents.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Handle workplace safety, welfare, wellness, and health reporting.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Oversee employee disciplinary meetings, terminations, and investigations.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: false,
        text: "Bachelor's degree in Human Resources, Business Administration, or related field.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: "Master's degree in Human Resources Management or related field preferred.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Professional certification in HR (e.g., PHR, SPHR, SHRM-CP, SHRM-SCP) is highly desirable.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Proven continuous learning in employment law, compensation, organizational planning, organization development, employee relations, safety, training, and preventive labor relations.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Courses and workshops on leadership, conflict resolution, and negotiation skills.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Experience with HR metrics and HR systems and databases.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Ability to architect strategy along with leadership skills.',
      },
    ],
    job_experience: [],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 474,
  };

  const profile212: JobProfile = {
    id: 6,
    behavioural_competencies: await getCompetencies(bcProfile212),
    optional_requirements: [],
    review_required: false,
    program_overview: '',
    professional_registration_requirements: [],
    preferences: [],
    knowledge_skills_abilities: [],
    willingness_statements: [],
    security_screenings: [],
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    is_archived: false,
    role_id: 1,
    role_type_id: null,
    state: 'PUBLISHED',
    type: 'CORPORATE',
    title: 'Environmental Scientist',
    number: 212,
    overview:
      'Passionate Environmental Scientist to analyze environmental data and develop strategies to address environmental issues and promote sustainability.',
    context:
      'The individual occupies a critical position within the customer service team, reporting to the Customer Service Manager, who sets service standards and monitors team performance.',
    accountabilities: [
      {
        text: 'Conduct fieldwork and collect environmental data on air, water, soil, and plant life.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Analyze environmental data and report findings.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Develop environmental management plans for conservation and sustainable practices.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Advise policymakers and businesses on environmental best practices and regulations.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Conduct environmental impact assessments for new projects and developments.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Monitor environmental improvement programs and ensure compliance with environmental regulations.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Collaborate with environmental scientists, planners, hazardous waste technicians, engineers, and other specialists.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Investigate and report on incidents, such as pollution, wildlife disturbances, and contamination.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Promote environmental awareness through education and advocacy.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Stay updated on environmental legislation and scientific advancements.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Work on climate change analysis and modeling.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Engage in restoration projects for damaged ecosystems.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Utilize Geographic Information Systems (GIS) for data analysis and mapping.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Prepare environmental reports and presentations for various stakeholders.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: false,
        text: 'Bachelor’s degree in Environmental Science, Biology, Chemistry, Earth Science, or related field.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Master’s degree or PhD in Environmental Science or related discipline preferred.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Professional certifications related to environmental management and sustainability.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Continuous education through workshops, seminars, and courses in environmental laws, regulations, and policy.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Hands-on experience with analytical, scientific, and data analysis software.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Fieldwork experience and familiarity with environmental sampling techniques.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Understanding of Geographic Information Systems (GIS) and environmental modeling software.',
      },
    ],
    job_experience: [],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 747,
  };

  const profile247: JobProfile = {
    id: 7,
    behavioural_competencies: await getCompetencies(bcProfile247),
    review_required: false,
    program_overview: '',
    total_comp_create_form_misc: { employeeGroup: 'GEU' },
    all_reports_to: false,
    all_organizations: true,
    role_id: 1,
    role_type_id: null,
    state: 'PUBLISHED',
    type: 'CORPORATE',
    title: 'Financial Analyst',
    is_archived: false,
    number: 247,
    overview:
      'Detail-oriented Financial Analyst to provide analysis of financial data, forecast future trends, and advise on investment decisions.',
    context:
      'The job holder is part of the human resources team and is supervised by the HR Director, who sets policies for employee relations and development, offering mentorship and policy guidance.',
    accountabilities: [
      {
        text: 'Analyze financial data and create financial models for decision support.',
        is_significant: true,
        is_readonly: true,
      },
      {
        text: 'Report on financial performance and prepare for regular leadership reviews.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Analyze past results, perform variance analysis, identify trends, and make recommendations for improvements.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Work closely with the accounting team to ensure accurate financial reporting.',
        is_significant: false,
        is_readonly: false,
      },
      {
        text: 'Evaluate financial performance by comparing and analyzing actual results with plans and forecasts.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Guide the cost analysis process by establishing and enforcing policies and procedures.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Provide analysis of trends and forecasts and recommend actions for optimization.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Recommend actions by analyzing and interpreting data and making comparative analyses; study proposed changes in methods and materials.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Identify and drive process improvements, including the creation of standard and ad-hoc reports, tools, and Excel dashboards.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Increase productivity by developing automated reporting/forecasting tools.',
        is_significant: true,
        is_readonly: false,
      },
      {
        text: 'Market research, data mining, business intelligence, and valuation comps.',
        is_significant: true,
        is_readonly: false,
      },
    ],
    education: [
      {
        is_significant: true,
        is_readonly: true,
        text: 'Bachelor’s degree in Finance, Economics, Accounting, Mathematics, Statistics, or related field.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: "Master's degree in Finance, Business Administration (MBA), or related field preferred.",
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Certifications such as Chartered Financial Analyst (CFA) or Certified Public Accountant (CPA) are advantageous.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Proven work experience as a Financial Analyst, Financial Consultant, or similar role.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Strong working knowledge of financial forecasting, corporate finance, information analysis, and financial modeling techniques.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Experience with statistical analysis and financial forecasting.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Attention to detail and the ability to identify data patterns.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Good verbal and written communication skills.',
      },
      {
        is_significant: true,
        is_readonly: false,
        text: 'Advanced knowledge of Excel, including pivot tables, formulas, and charts.',
      },
    ],
    created_at: new Date(2024, 6, 1),
    updated_at: new Date(2024, 7, 1),
    published_at: new Date(2024, 6, 15),
    owner_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
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
    security_screenings: [
      {
        text: 'Security Screening 1',
        is_readonly: true,
        is_significant: true,
      },
      {
        text: 'Security Screening 2',
        is_readonly: false,
        is_significant: true,
      },
      {
        text: 'Security Screening 3',
        is_readonly: false,
        is_significant: true,
      },
    ],
    preferences: ['Preference 1', 'Preference 2'],
    optional_requirements: ['Optional requirement 1', 'Optional requirement 2'],
    willingness_statements: ['Proviso 1', 'Proviso 2'],
    knowledge_skills_abilities: ['Knowledge, Skills, and Abilities 1', 'Knowledge, Skills, and Abilities 2'],
    professional_registration_requirements: [
      { text: 'Professional registration requirement 1', is_readonly: false, is_significant: true },
      { text: 'Professional registration requirement 2', is_readonly: false, is_significant: true },
    ],
    updated_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    published_by_id: '88bd8bb6-c449-4c13-8204-d91539f548d4',
    valid_from: undefined,
    valid_to: undefined,
    version: 1,
    views: 0,
  };

  let other_profiles: any[] = [] as any[];
  try {
    const path = process.env.NODE_ENV == 'development' ? '../../other-profiles.js' : '/tmp/log/other-profiles.js';
    other_profiles = (await import(path)).otherProfiles as unknown as any[];
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other profiles: ', error);
  }

  // const fs = require('node:fs');
  // const content = JSON.stringify(otherProfiles);

  // // Asynchronous
  // fs.writeFile('output.txt', content, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   // File written successfully
  // });

  console.log('inserting profiles: ', other_profiles.length);
  const jobProfiles =
    other_profiles.length > 0
      ? other_profiles
      : [profile189, profile194, profile200, profile208, profile210, profile212, profile247];

  // await prisma.jobProfile.createMany({ data: jobProfiles });

  for await (const profile of jobProfiles) {
    const { id, version, ...rest } = profile;

    // console.log('inserting profile id: ', id);
    await prisma.jobProfile.upsert({
      where: { id_version: { id, version } },
      create: {
        id,
        version,
        ...rest,
      },
      update: {
        ...rest,
      },
    });
  }

  other_profiles.length = 0;
  jobProfiles.length = 0;

  // await prisma.jobProfile.createMany({
  //   data: jobProfiles,
  // });

  // Reset auto-increment or profiles table so that inserting works correctly

  async function resetAutoIncrement() {
    const maxId = await prisma.jobProfile.aggregate({
      _max: {
        id: true,
      },
    });

    await prisma.$executeRawUnsafe(
      `SELECT SETVAL(pg_get_serial_sequence('job_profile', 'id'), ${maxId._max.id + 1}, false);`,
    );
  }

  await resetAutoIncrement();

  let other_classifications: any[] = [] as any[];
  try {
    console.log('importing other classifications1');
    const path =
      process.env.NODE_ENV == 'development' ? '../../other-classifications.js' : '/tmp/log/other-classifications.js';

    other_classifications = (await import(path)).otherClassifications1 as unknown as any[];
    // await prisma.classification.createMany({
    //   data: other_classifications,
    // });

    for (const classification of other_classifications) {
      try {
        const created = await prisma.classification.create({
          data: classification,
        });
        // console.log(`Created classification: ${JSON.stringify(created)}`);
      } catch (error) {
        console.error(`Failed to create classification: ${JSON.stringify(classification)}`);
        console.error(error);
      }
    }

    console.log('importing other classifications2');

    other_classifications = (await import(path)).otherClassifications2 as unknown as any[];
    // await prisma.classification.createMany({
    //   data: other_classifications,
    // });
    for (const classification of other_classifications) {
      try {
        const created = await prisma.classification.create({
          data: classification,
        });
        // console.log(`Created classification: ${JSON.stringify(created)}`);
      } catch (error) {
        console.error(`Failed to create classification: ${JSON.stringify(classification)}`);
        console.error(error);
      }
    }

    console.log('importing other classifications3');

    other_classifications = (await import(path)).otherClassifications3 as unknown as any[];
    // await prisma.classification.createMany({
    //   data: other_classifications,
    // });
    for (const classification of other_classifications) {
      try {
        const created = await prisma.classification.create({
          data: classification,
        });
        // console.log(`Created classification: ${JSON.stringify(created)}`);
      } catch (error) {
        console.error(`Failed to create classification: ${JSON.stringify(classification)}`);
        console.error(error);
      }
    }

    // Use the imported data
  } catch (error) {
    // console.error('Error importing other classifications: ', error);

    const classifications = [
      {
        id: 'CLS01',
        peoplesoft_id: 'PSFTCLASS01',
        code: 'ENG',
        name: 'Engineer',
        employee_group_id: 'GEU', // Ensure this matches an existing EmployeeGroup ID
        grade: 'G1',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: 'CLS02',
        peoplesoft_id: 'PSFTCLASS02',
        code: 'PRJMGR',
        name: 'Project Manager',
        employee_group_id: 'GEU', // Ensure this matches an existing EmployeeGroup ID
        grade: 'G2',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: 'CLS03',
        peoplesoft_id: 'PSFTCLASS03',
        code: 'UXDSGN',
        name: 'UX Designer',
        employee_group_id: 'GEU', // Ensure this matches an existing EmployeeGroup ID
        grade: 'G3',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
    ];

    await prisma.classification.createMany({
      data: classifications,
    });
  }

  let jobProfileClassifications = [
    {
      classification_id: '508011',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '508010',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '508013',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '752203',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '501537',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },
    {
      classification_id: '508011',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '508010',
      classification_employee_group_id: 'GEU',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
  ];

  const classificationData = {
    '752203': {
      code: 'SPV 15R',
      name: 'Supervisor R15',
      grade: '15A',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '508013': {
      code: 'ISL 30R',
      name: 'Information Systems R30',
      grade: '30A',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '508011': {
      code: 'ISL 27R',
      name: 'Information Systems R27',
      grade: '27A',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '508010': {
      code: 'ISL 24R',
      name: 'Information Systems R24',
      grade: '24A',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '501537': {
      code: 'COMM O 30R',
      name: 'Communications Officer R30',
      grade: '30A',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
  };

  try {
    for await (const jobProfileClassification of jobProfileClassifications) {
      const data = classificationData[jobProfileClassification.classification_id] || {
        code: '',
        name: '',
        grade: '',
        effective_status: '',
        effective_date: new Date('1900-01-01'),
      };

      await prisma.classification.upsert({
        where: {
          id_employee_group_id_peoplesoft_id: {
            id: jobProfileClassification.classification_id,
            employee_group_id: jobProfileClassification.classification_employee_group_id,
            peoplesoft_id: jobProfileClassification.classification_peoplesoft_id,
          },
        },
        create: {
          id: jobProfileClassification.classification_id,
          peoplesoft_id: jobProfileClassification.classification_peoplesoft_id,
          ...data,
          employee_group_id: jobProfileClassification.classification_employee_group_id,
        },
        update: {},
      });
    }
  } catch (e) {
    console.log('ERROR: failed to create classifications');
  }

  try {
    const path =
      process.env.NODE_ENV == 'development'
        ? '../../other-job-profile-classifications.js'
        : '/tmp/log/other-job-profile-classifications.js';
    jobProfileClassifications = (await import(path)).otherProfileClassifications as unknown as any[];
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other jobProfileClassifications: ', error);
  }

  // try {
  for (const classification of jobProfileClassifications) {
    try {
      await prisma.jobProfileClassification.create({
        data: classification,
      });
      // console.log(`Successfully created: ${classification.name}`);
    } catch (error) {
      console.error(`Failed to create:`, classification, error);
    }
  }
  // } catch (e) {
  //   console.log('ERROR: failed to create jobProfileClassification: ', e);
  // }

  try {
    const path =
      process.env.NODE_ENV == 'development'
        ? '../../other-job-profile-family-link.js'
        : '/tmp/log/other-job-profile-family-link.js';
    const otherJobProfileFamilyLink = (await import(path)).otherJobProfileFamilyLink as unknown as any[];
    for (const familyLink of otherJobProfileFamilyLink) {
      try {
        await prisma.jobProfileJobFamilyLink.create({
          data: familyLink,
        });
      } catch (error) {
        console.error(`Failed to create job family link for:`, familyLink, error);
      }
    }
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other otherJobProfileFamilyLink: ', error);

    try {
      await prisma.jobProfileJobFamilyLink.createMany({
        data: [
          { jobProfileId: profile189.id, jobProfileVersion: profile189.version, jobFamilyId: 7 },
          { jobProfileId: profile194.id, jobProfileVersion: profile194.version, jobFamilyId: 1 },
          { jobProfileId: profile200.id, jobProfileVersion: profile200.version, jobFamilyId: 1 },
          { jobProfileId: profile208.id, jobProfileVersion: profile208.version, jobFamilyId: 1 },
          { jobProfileId: profile210.id, jobProfileVersion: profile210.version, jobFamilyId: 7 },
          { jobProfileId: profile212.id, jobProfileVersion: profile212.version, jobFamilyId: 1 },
          // there's a mismatch with the stream, it's ok (if it's 1 it will be in admin and education verification won't trigger)
          { jobProfileId: profile247.id, jobProfileVersion: profile247.version, jobFamilyId: 7 },
        ],
      });
    } catch (e) {
      console.log('ERROR: failed to create jobProfileJobFamilyLink');
    }
  }

  try {
    const path =
      process.env.NODE_ENV == 'development'
        ? '../../other-job-profile-stream-link.js'
        : '/tmp/log/other-job-profile-stream-link.js';
    const otherJobProfileStreamLink = (await import(path)).otherJobProfileStreamLink as unknown as any[];
    for (const streamLink of otherJobProfileStreamLink) {
      try {
        await prisma.jobProfileStreamLink.create({
          data: streamLink,
        });
      } catch (error) {
        console.error(`Failed to create stream link for:`, streamLink, error);
      }
    }
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other otherJobProfileStreamLink: ', error);

    try {
      await prisma.jobProfileStreamLink.createMany({
        data: [
          { jobProfileId: profile189.id, jobProfileVersion: profile189.version, streamId: 33 },
          { jobProfileId: profile194.id, jobProfileVersion: profile194.version, streamId: 1 },
          { jobProfileId: profile200.id, jobProfileVersion: profile200.version, streamId: 1 },
          { jobProfileId: profile208.id, jobProfileVersion: profile208.version, streamId: 1 },
          { jobProfileId: profile210.id, jobProfileVersion: profile210.version, streamId: 33 },
          { jobProfileId: profile212.id, jobProfileVersion: profile212.version, streamId: 1 },
          { jobProfileId: profile247.id, jobProfileVersion: profile247.version, streamId: 1 },
        ],
      });
    } catch (e) {
      console.log('ERROR: failed to create jobProfileStreamLink');
    }
  }

  const jobProfileReportsTo = [
    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile194.id,
      job_profile_version: profile194.version,
    },
    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile200.id,
      job_profile_version: profile200.version,
    },
    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile208.id,
      job_profile_version: profile208.version,
    },
    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile189.id,
      job_profile_version: profile189.version,
    },
    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile210.id,
      job_profile_version: profile210.version,
    },

    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile212.id,
      job_profile_version: profile212.version,
    },
    {
      classification_id: '185001',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
    {
      classification_id: '185002',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
    {
      classification_id: '185003',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
    {
      classification_id: '185004',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
    {
      classification_id: '185005',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
    {
      classification_id: '185006',
      classification_employee_group_id: 'MGT',
      classification_peoplesoft_id: 'BCSET',
      job_profile_id: profile247.id,
      job_profile_version: profile247.version,
    },
  ];

  const classificationData2 = {
    '185001': {
      code: 'Band 1',
      name: 'Band 1',
      grade: 'B1',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '185002': {
      code: 'Band 2',
      name: 'Band 2',
      grade: 'B2',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '185003': {
      code: 'Band 3',
      name: 'Band 3',
      grade: 'B3',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '185004': {
      code: 'Band 4',
      name: 'Band 4',
      grade: 'B4',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '185005': {
      code: 'Band 5',
      name: 'Band 5',
      grade: 'B5',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
    '185006': {
      code: 'Band 6',
      name: 'Band 6',
      grade: 'B6',
      effective_status: 'Active',
      effective_date: new Date('2024-07-20'),
    },
  };

  try {
    const path =
      process.env.NODE_ENV == 'development' ? '../../job-profile-reports-to.js' : '/tmp/log/job-profile-reports-to.js';
    const otherJobProfileReportsTo = (await import(path)).otherJobProfileReportsTo as unknown as any[];
    for (const reportsTo of otherJobProfileReportsTo) {
      try {
        await prisma.jobProfileReportsTo.create({
          data: reportsTo,
        });
      } catch (error) {
        console.error(`Failed to create reports-to record for ID:`, reportsTo, error);
      }
    }
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other otherJobProfileReportsTo: ', error);

    try {
      for await (const reportsTo of jobProfileReportsTo) {
        const {
          classification_id,
          classification_employee_group_id,
          classification_peoplesoft_id,
          job_profile_id,
          job_profile_version,
        } = reportsTo;

        const data = classificationData2[classification_id] || {
          code: '',
          name: '',
          grade: '',
          effective_status: '',
          effective_date: new Date('1900-01-01'),
        };

        await prisma.classification.upsert({
          where: {
            id_employee_group_id_peoplesoft_id: {
              id: classification_id,
              employee_group_id: classification_employee_group_id,
              peoplesoft_id: classification_peoplesoft_id,
            },
          },
          create: {
            id: classification_id,
            peoplesoft_id: classification_peoplesoft_id,
            ...data,
            employee_group_id: classification_employee_group_id,
          },
          update: {},
        });

        await prisma.jobProfileReportsTo.upsert({
          where: {
            job_profile_id_job_profile_version_classification_id_classification_employee_group_id_classification_peoplesoft_id:
              {
                job_profile_id,
                job_profile_version,
                classification_id,
                classification_employee_group_id,
                classification_peoplesoft_id,
              },
          },
          create: {
            classification_id,
            classification_employee_group_id,
            classification_peoplesoft_id,
            job_profile_id,
            job_profile_version,
          },
          update: {},
        });
      }
    } catch (e) {
      console.log('ERROR: failed to create jobProfileReportsTo');
    }
  }

  const organizations = [
    {
      BUSINESS_UNIT: 'BC000',
      SETID: 'ST000',
      DESCRSHORT: 'GOV',
      DESCR: 'BC Public Service Agency',
      EFF_STATUS: 'Active',
      EFFDT: '2024-01-01',
    },
    {
      BUSINESS_UNIT: 'BC002',
      SETID: 'ST001',
      DESCRSHORT: 'ASSEMBLY',
      DESCR: 'Legislative Assembly',
      EFF_STATUS: 'Active',
      EFFDT: '2024-01-01',
    },
    {
      BUSINESS_UNIT: 'BC003',
      SETID: 'ST003',
      DESCRSHORT: 'AD GENERAL',
      DESCR: 'Auditor General',
      EFF_STATUS: 'Active',
      EFFDT: '2024-01-01',
    },
    {
      BUSINESS_UNIT: 'BC004',
      SETID: 'ST004',
      DESCRSHORT: 'RU Value',
      DESCR: 'Office of the Premier',
      EFF_STATUS: 'Active',
      EFFDT: '2024-01-01',
    },
    {
      BUSINESS_UNIT: 'BC112',
      SETID: 'ST113',
      DESCRSHORT: 'CITZ',
      DESCR: "Citizens' Services",
      EFF_STATUS: 'Active',
      EFFDT: '2024-01-01',
    },
  ];

  try {
    const path = process.env.NODE_ENV == 'development' ? '../../organization.js' : '/tmp/log/organization.js';
    const organization = (await import(path)).organization as unknown as any[];
    for (const org of organization) {
      try {
        await prisma.organization.create({
          data: org,
        });
      } catch (error) {
        console.error(`Failed to create org for:`, org, error);
      }
    }
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other job_profile_org: ', error);

    for await (const row of organizations) {
      await prisma.organization.upsert({
        where: { id: row.BUSINESS_UNIT },
        create: {
          id: row.BUSINESS_UNIT,
          peoplesoft_id: row.SETID,
          code: row.DESCRSHORT,
          name: row.DESCR,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
        update: {
          peoplesoft_id: row.SETID,
          code: row.DESCRSHORT,
          name: row.DESCR,
          effective_status: row.EFF_STATUS,
          effective_date: new Date(row.EFFDT),
        },
      });
    }
  }

  try {
    const path =
      process.env.NODE_ENV == 'development'
        ? '../../job_profile_organization.js'
        : '/tmp/log/job_profile_organization.js';
    const job_profile_organization = (await import(path)).job_profile_organization as unknown as any[];
    for (const job_profile_org of job_profile_organization) {
      try {
        await prisma.jobProfileOrganization.create({
          data: job_profile_org,
        });
      } catch (error) {
        console.error(`Failed to create job_profile_org for:`, job_profile_org, error);
      }
    }
    // Use the imported data
  } catch (error) {
    // console.error('Error importing other job_profile_org: ', error);
  }

  // await prisma.jobProfileOrganization.createMany({
  //   data: [
  //     { job_profile_id: profile194.id, organization_id: 'BC000' },
  //     { job_profile_id: profile200.id, organization_id: 'BC002' },
  //     { job_profile_id: profile208.id, organization_id: 'BC003' },
  //     { job_profile_id: profile210.id, organization_id: 'BC004' },
  //     { job_profile_id: profile212.id, organization_id: 'BC000' },
  //     { job_profile_id: profile247.id, organization_id: 'BC002' },
  //     { job_profile_id: profile247.id, organization_id: 'BC003' },
  //   ],
  // });

  await prisma.location.createMany({
    data: [
      {
        id: 'LOC01',
        peoplesoft_id: 'PSFTLOC01',
        code: 'LOC01',
        name: 'Downtown Office',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: 'LOC02',
        peoplesoft_id: 'PSFTLOC02',
        code: 'LOC02',
        name: 'Uptown Branch',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: 'LOC03',
        peoplesoft_id: 'PSFTLOC03',
        code: 'LOC03',
        name: 'Suburban Campus',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
    ],
  });

  await prisma.department.createMany({
    data: [
      {
        id: '112-0074',
        location_id: 'LOC01', // Ensure these IDs match existing records in your database
        organization_id: 'BC000',
        peoplesoft_id: 'PSFT04',
        code: 'DPT01',
        name: 'Informational Resource Management',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: 'DEPT01',
        location_id: 'LOC01', // Ensure these IDs match existing records in your database
        organization_id: 'BC000',
        peoplesoft_id: 'PSFT01',
        code: 'DPT01',
        name: 'Research and Development',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: '123-4567',
        location_id: 'LOC02',
        organization_id: 'BC000',
        peoplesoft_id: 'PSFT02',
        code: 'DPT02',
        name: 'Human Resources',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
      {
        id: 'DEPT03',
        location_id: 'LOC03',
        organization_id: 'BC112',
        peoplesoft_id: 'PSFT03',
        code: 'DPT03',
        name: 'Information Technology',
        effective_status: 'Active',
        effective_date: new Date('2022-01-01'),
      },
    ],
  });

  await prisma.departmentMetadata.createMany({
    data: [
      {
        department_id: '112-0074',
        is_statutorily_excluded: false,
      },
      {
        department_id: 'DEPT01',
        is_statutorily_excluded: false,
      },
      {
        department_id: '123-4567',
        is_statutorily_excluded: false,
      },
      {
        department_id: 'DEPT03',
        is_statutorily_excluded: false,
      },
    ],
  });

  try {
    await prisma.positionRequest.createMany({
      data: [
        {
          crm_id: 12345,
          crm_assigned_to_account_id: 67890,
          step: 3,
          reports_to_position_id: '00121521',
          department_id: '112-0074',
          parent_job_profile_id: profile247.id,
          parent_job_profile_version: 1,
          crm_json: null,
          profile_json: null,
          orgchart_json: {
            edges: [
              { id: '00054345-00008599', type: 'smoothstep', source: '00054345', target: '00008599' },
              { id: '00008599-00081675', type: 'smoothstep', source: '00008599', target: '00081675' },
              { id: '00008599-00038563', type: 'smoothstep', source: '00008599', target: '00038563' },
              { id: '00008599-00042391', type: 'smoothstep', source: '00008599', target: '00042391' },
              { id: '00008599-00093866', type: 'smoothstep', source: '00008599', target: '00093866' },
              { id: '00008599-00030150', type: 'smoothstep', source: '00008599', target: '00030150' },
              { id: '00008599-00079380', type: 'smoothstep', source: '00008599', target: '00079380' },
              { id: '00126684-00057755', type: 'smoothstep', source: '00126684', target: '00057755' },
              { id: '00008599-00067309 ', type: 'smoothstep', source: '00008599', target: '00067309 ' },
              { id: '00008599-00030112', type: 'smoothstep', source: '00008599', target: '00030112' },
              { id: '00008599-00092685', type: 'smoothstep', source: '00008599', target: '00092685' },
              { id: '00008599-00023206', type: 'smoothstep', source: '00008599', target: '00023206' },
            ],
            nodes: [
              {
                id: '00008599',
                data: {
                  id: '00008599',
                  title: 'Exec Dir & Chief Fin Officer',
                  employees: [{ id: '000324', name: 'Alice Johnson', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185005', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59325, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00081675',
                data: {
                  id: '00081675',
                  title: 'Senior Project Manager',
                  employees: [{ id: '001456', name: 'Bob Smith', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363104', code: 'CLK ST 12R', name: 'Clerk Stenographer R12' },
                },
                type: 'org-chart-card',
                position: { x: 57400, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00038563',
                data: {
                  id: '00038563',
                  title: 'Lead Software Engineer',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 57750, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00042391',
                data: {
                  id: '00042391',
                  title: 'HR Manager',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 58100, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00093866',
                data: {
                  id: '00093866',
                  title: 'Coor.Transition Planning',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181003', code: 'MGMT LV 03', name: 'Management Level 03' },
                },
                type: 'org-chart-card',
                position: { x: 58450, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030150',
                data: {
                  id: '00030150',
                  title: 'Clerk Stenographer R9',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363103', code: 'CLK ST 09R', name: 'Clerk Stenographer R9' },
                },
                type: 'org-chart-card',
                position: { x: 58800, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00079380',
                data: {
                  id: '00079380',
                  title: 'Manager, Capital Finance',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181005', code: 'MGMT LV 05', name: 'Management Level 05' },
                },
                type: 'org-chart-card',
                position: { x: 59150, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00057755',
                data: {
                  id: '00057755',
                  title: 'Financial Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551402', code: 'FO 18R', name: 'Financial Officer R18' },
                },
                type: 'org-chart-card',
                position: { x: 59675, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00067309 ',
                data: {
                  id: '00067309 ',
                  title: 'Sr. Project Management Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551505', code: 'ADMN O 24R', name: 'Administrative Officer R24' },
                },
                type: 'org-chart-card',
                position: { x: 59500, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030112',
                data: {
                  id: '00030112',
                  title: 'Sr Dir, Financial Operations',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185004', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59850, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00092685',
                data: {
                  id: '00092685',
                  title: 'Level 1 Co-op',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '361301', code: 'COOP LVL 1', name: 'Coop Education Train Prgm Lv1' },
                },
                type: 'org-chart-card',
                position: { x: 60200, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00023206',
                data: {
                  id: '00023206',
                  title: 'Fun CEO',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551104', code: 'CLK 12R', name: 'Clerk R12' },
                },
                type: 'org-chart-card',
                position: { x: 60550, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
            ],
          },
          user_id: TEST_USER_ID,
          title: 'Senior Analyst',
          position_number: null,
          classification_id: '508011',
          submission_id: 'SUB001',
          submitted_at: new Date(),
          approved_at: new Date(),
          status: 'DRAFT',
          updated_at: new Date(),
          classification_employee_group_id: 'GEU',
          classification_peoplesoft_id: 'BCSET',
          additional_info: {
            branch: 'branch1',
            division: 'division1',
            department_id: '019-1960',
            work_location_id: 'V8V4W803',
            work_location_name: '3-835 Humboldt St.',
            excluded_mgr_position_number: '00054971',
            excluded_mgr_name: 'John Doe',
          },
        },
        {
          crm_id: 54322,
          crm_assigned_to_account_id: 98765,
          step: 1,
          reports_to_position_id: '00121521',
          department_id: '112-0074',
          parent_job_profile_id: profile200.id,
          parent_job_profile_version: 1,
          crm_json: null,
          profile_json: null,
          // {
          //   id: profile200.id,
          //   role: { id: null },
          //   type: 'USER',
          //   scope: { id: null },
          //   title: { value: 'Financial Analyst - Additional info step', disabled: false, isCustom: false },
          //   number: 247,
          //   context:
          //     'The job holder is part of the human resources team and is supervised by the HR Director, who sets policies for employee relations and development, offering mentorship and policy guidance.',
          //   streams: [],
          //   overview: {
          //     value:
          //       'Detail-oriented Financial Analyst to provide analysis of financial data, forecast future trends, and advise on investment decisions.',
          //     disabled: false,
          //     isCustom: false,
          //   },
          //   education: [
          //     {
          //       is_significant: true,
          //       is_readonly: true,
          //       text: 'Bachelor’s degree in Finance, Economics, Accounting, Mathematics, Statistics, or related field.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: "Master's degree in Finance, Business Administration (MBA), or related field preferred.",
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Certifications such as Chartered Financial Analyst (CFA) or Certified Public Accountant (CPA) are advantageous.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Proven work experience as a Financial Analyst, Financial Consultant, or similar role.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Strong working knowledge of financial forecasting, corporate finance, information analysis, and financial modeling techniques.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Experience with statistical analysis and financial forecasting.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Attention to detail and the ability to identify data patterns.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Good verbal and written communication skills.',
          //     },
          //     {
          //       is_significant: true,
          //       is_readonly: false,
          //       text: 'Advanced knowledge of Excel, including pivot tables, formulas, and charts.',
          //     },
          //   ],
          //   role_type: { id: null },
          //   reports_to: [],
          //   jobFamilies: [],
          //   preferences: [],
          //   professions: [],
          //   organizations: [],
          //   all_reports_to: false,
          //   job_experience: [],
          //   classifications: [
          //     {
          //       classification: {
          //         id: '551404',
          //         code: 'FO 21R',
          //         name: 'Financial Officer R21',
          //         grade: '21A',
          //         employee_group_id: 'GEU',
          //       },
          //     },
          //   ],
          //   organization_id: '-1',
          //   review_required: false,
          //   accountabilities: [
          //     {
          //       text: 'Analyze financial data and create financial models for decision support.',
          //       is_significant: true,
          //       is_readonly: true,
          //     },
          //     {
          //       text: 'Report on financial performance and prepare for regular leadership reviews.',
          //       is_significant: false,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Analyze past results, perform variance analysis, identify trends, and make recommendations for improvements.',
          //       is_significant: false,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Work closely with the accounting team to ensure accurate financial reporting.',
          //       is_significant: false,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Evaluate financial performance by comparing and analyzing actual results with plans and forecasts.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Guide the cost analysis process by establishing and enforcing policies and procedures.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Provide analysis of trends and forecasts and recommend actions for optimization.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Recommend actions by analyzing and interpreting data and making comparative analyses; study proposed changes in methods and materials.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Identify and drive process improvements, including the creation of standard and ad-hoc reports, tools, and Excel dashboards.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Increase productivity by developing automated reporting/forecasting tools.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //     {
          //       text: 'Market research, data mining, business intelligence, and valuation comps.',
          //       is_significant: true,
          //       is_readonly: false,
          //     },
          //   ],
          //   program_overview: { value: '', disabled: false, isCustom: false },
          //   all_organizations: true,
          //   security_screenings: [],
          //   optional_requirements: [],
          //   willingness_statements: [],
          //   behavioural_competencies: [
          //     {
          //       behavioural_competency: {
          //         id: 17,
          //         name: 'Business acumen',
          //         description:
          //           'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          //       },
          //     },
          //     {
          //       behavioural_competency: {
          //         id: 21,
          //         name: 'Managing organizational resources',
          //         description:
          //           'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          //       },
          //     },
          //     {
          //       behavioural_competency: {
          //         id: 23,
          //         name: 'Problem solving and judgement',
          //         description:
          //           'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          //       },
          //     },
          //     {
          //       behavioural_competency: {
          //         id: 22,
          //         name: 'Planning, organizing and coordinating',
          //         description:
          //           "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          //       },
          //     },
          //     {
          //       behavioural_competency: {
          //         id: 42,
          //         name: 'Leadership',
          //         description:
          //           "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
          //       },
          //     },
          //   ],
          //   knowledge_skills_abilities: [],
          //   professional_registration_requirements: [],
          // },
          orgchart_json: {
            edges: [
              { id: '00054345-00008599', type: 'smoothstep', source: '00054345', target: '00008599' },
              { id: '00008599-00081675', type: 'smoothstep', source: '00008599', target: '00081675' },
              { id: '00008599-00038563', type: 'smoothstep', source: '00008599', target: '00038563' },
              { id: '00008599-00042391', type: 'smoothstep', source: '00008599', target: '00042391' },
              { id: '00008599-00093866', type: 'smoothstep', source: '00008599', target: '00093866' },
              { id: '00008599-00030150', type: 'smoothstep', source: '00008599', target: '00030150' },
              { id: '00008599-00079380', type: 'smoothstep', source: '00008599', target: '00079380' },
              { id: '00126684-00057755', type: 'smoothstep', source: '00126684', target: '00057755' },
              { id: '00008599-00067309 ', type: 'smoothstep', source: '00008599', target: '00067309 ' },
              { id: '00008599-00030112', type: 'smoothstep', source: '00008599', target: '00030112' },
              { id: '00008599-00092685', type: 'smoothstep', source: '00008599', target: '00092685' },
              { id: '00008599-00023206', type: 'smoothstep', source: '00008599', target: '00023206' },
            ],
            nodes: [
              {
                id: '00008599',
                data: {
                  id: '00008599',
                  title: 'Exec Dir & Chief Fin Officer',
                  employees: [{ id: '000324', name: 'Alice Johnson', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185005', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59325, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00081675',
                data: {
                  id: '00081675',
                  title: 'Senior Project Manager',
                  employees: [{ id: '001456', name: 'Bob Smith', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363104', code: 'CLK ST 12R', name: 'Clerk Stenographer R12' },
                },
                type: 'org-chart-card',
                position: { x: 57400, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00038563',
                data: {
                  id: '00038563',
                  title: 'Lead Software Engineer',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 57750, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00042391',
                data: {
                  id: '00042391',
                  title: 'HR Manager',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 58100, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00093866',
                data: {
                  id: '00093866',
                  title: 'Coor.Transition Planning',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181003', code: 'MGMT LV 03', name: 'Management Level 03' },
                },
                type: 'org-chart-card',
                position: { x: 58450, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030150',
                data: {
                  id: '00030150',
                  title: 'Clerk Stenographer R9',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363103', code: 'CLK ST 09R', name: 'Clerk Stenographer R9' },
                },
                type: 'org-chart-card',
                position: { x: 58800, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00079380',
                data: {
                  id: '00079380',
                  title: 'Manager, Capital Finance',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181005', code: 'MGMT LV 05', name: 'Management Level 05' },
                },
                type: 'org-chart-card',
                position: { x: 59150, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00057755',
                data: {
                  id: '00057755',
                  title: 'Financial Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551402', code: 'FO 18R', name: 'Financial Officer R18' },
                },
                type: 'org-chart-card',
                position: { x: 59675, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00067309 ',
                data: {
                  id: '00067309 ',
                  title: 'Sr. Project Management Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551505', code: 'ADMN O 24R', name: 'Administrative Officer R24' },
                },
                type: 'org-chart-card',
                position: { x: 59500, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030112',
                data: {
                  id: '00030112',
                  title: 'Sr Dir, Financial Operations',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185004', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59850, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00092685',
                data: {
                  id: '00092685',
                  title: 'Level 1 Co-op',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '361301', code: 'COOP LVL 1', name: 'Coop Education Train Prgm Lv1' },
                },
                type: 'org-chart-card',
                position: { x: 60200, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00023206',
                data: {
                  id: '00023206',
                  title: 'Fun CEO',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551104', code: 'CLK 12R', name: 'Clerk R12' },
                },
                type: 'org-chart-card',
                position: { x: 60550, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00121521',
                data: {
                  id: '00121521',
                  title: 'Digital CEO',
                  employees: [{ id: '000324', name: 'Alice Johnson', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC112' },
                  classification: { id: '551104', code: 'CLK 12R', name: 'Clerk R12' },
                },
                type: 'org-chart-card',
                position: { x: 60550, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
            ],
          },
          user_id: TEST_USER_ID,
          title: 'Project Manager - Additional info step',
          position_number: null,
          classification_id: '752203',
          submission_id: 'SUB002',
          submitted_at: new Date(),
          approved_at: new Date(),
          status: 'DRAFT',
          updated_at: new Date(),
          classification_employee_group_id: 'GEU',
          classification_peoplesoft_id: 'BCSET',
          additional_info: Prisma.DbNull,
        },
        {
          crm_id: 54321,
          crm_assigned_to_account_id: 98765,
          step: 2,
          reports_to_position_id: 'POS456',
          department_id: '123-4567',
          parent_job_profile_id: profile200.id,
          parent_job_profile_version: 1,
          crm_json: null,
          profile_json: {
            id: profile200.id,
            role: { id: null },
            type: 'USER',
            scope: { id: null },
            title: { value: 'Financial Analyst', disabled: false, isCustom: false },
            number: 247,
            context:
              'The job holder is part of the human resources team and is supervised by the HR Director, who sets policies for employee relations and development, offering mentorship and policy guidance.',
            streams: [],
            overview: {
              value:
                'Detail-oriented Financial Analyst to provide analysis of financial data, forecast future trends, and advise on investment decisions.',
              disabled: false,
              isCustom: false,
            },
            education: [
              {
                is_significant: true,
                is_readonly: true,
                text: 'Bachelor’s degree in Finance, Economics, Accounting, Mathematics, Statistics, or related field.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: "Master's degree in Finance, Business Administration (MBA), or related field preferred.",
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Certifications such as Chartered Financial Analyst (CFA) or Certified Public Accountant (CPA) are advantageous.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Proven work experience as a Financial Analyst, Financial Consultant, or similar role.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Strong working knowledge of financial forecasting, corporate finance, information analysis, and financial modeling techniques.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Experience with statistical analysis and financial forecasting.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Attention to detail and the ability to identify data patterns.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Good verbal and written communication skills.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Advanced knowledge of Excel, including pivot tables, formulas, and charts.',
              },
            ],
            role_type: { id: null },
            reports_to: [],
            jobFamilies: [],
            preferences: [],
            professions: [],
            organizations: [],
            all_reports_to: false,
            job_experience: [],
            classifications: [
              {
                classification: {
                  id: '551404',
                  code: 'FO 21R',
                  name: 'Financial Officer R21',
                  grade: '21A',
                  employee_group_id: 'GEU',
                },
              },
            ],
            organization_id: '-1',
            review_required: false,
            accountabilities: [
              {
                text: 'Analyze financial data and create financial models for decision support.',
                is_significant: true,
                is_readonly: true,
              },
              {
                text: 'Report on financial performance and prepare for regular leadership reviews.',
                is_significant: false,
                is_readonly: false,
              },
              {
                text: 'Analyze past results, perform variance analysis, identify trends, and make recommendations for improvements.',
                is_significant: false,
                is_readonly: false,
              },
              {
                text: 'Work closely with the accounting team to ensure accurate financial reporting.',
                is_significant: false,
                is_readonly: false,
              },
              {
                text: 'Evaluate financial performance by comparing and analyzing actual results with plans and forecasts.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Guide the cost analysis process by establishing and enforcing policies and procedures.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Provide analysis of trends and forecasts and recommend actions for optimization.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Recommend actions by analyzing and interpreting data and making comparative analyses; study proposed changes in methods and materials.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Identify and drive process improvements, including the creation of standard and ad-hoc reports, tools, and Excel dashboards.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Increase productivity by developing automated reporting/forecasting tools.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Market research, data mining, business intelligence, and valuation comps.',
                is_significant: true,
                is_readonly: false,
              },
            ],
            program_overview: { value: '', disabled: false, isCustom: false },
            all_organizations: true,
            security_screenings: [],
            optional_requirements: [],
            willingness_statements: [],
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
                  id: 23,
                  name: 'Problem solving and judgement',
                  description:
                    'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
                  id: 42,
                  name: 'Leadership',
                  description:
                    "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
                },
              },
            ],
            knowledge_skills_abilities: [],
            professional_registration_requirements: [],
          },
          orgchart_json: {
            edges: [
              { id: '00054345-00008599', type: 'smoothstep', source: '00054345', target: '00008599' },
              { id: '00008599-00081675', type: 'smoothstep', source: '00008599', target: '00081675' },
              { id: '00008599-00038563', type: 'smoothstep', source: '00008599', target: '00038563' },
              { id: '00008599-00042391', type: 'smoothstep', source: '00008599', target: '00042391' },
              { id: '00008599-00093866', type: 'smoothstep', source: '00008599', target: '00093866' },
              { id: '00008599-00030150', type: 'smoothstep', source: '00008599', target: '00030150' },
              { id: '00008599-00079380', type: 'smoothstep', source: '00008599', target: '00079380' },
              { id: '00126684-00057755', type: 'smoothstep', source: '00126684', target: '00057755' },
              { id: '00008599-00067309 ', type: 'smoothstep', source: '00008599', target: '00067309 ' },
              { id: '00008599-00030112', type: 'smoothstep', source: '00008599', target: '00030112' },
              { id: '00008599-00092685', type: 'smoothstep', source: '00008599', target: '00092685' },
              { id: '00008599-00023206', type: 'smoothstep', source: '00008599', target: '00023206' },
            ],
            nodes: [
              {
                id: '00008599',
                data: {
                  id: '00008599',
                  title: 'Exec Dir & Chief Fin Officer',
                  employees: [{ id: '000324', name: 'Alice Johnson', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185005', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59325, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00081675',
                data: {
                  id: '00081675',
                  title: 'Senior Project Manager',
                  employees: [{ id: '001456', name: 'Bob Smith', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363104', code: 'CLK ST 12R', name: 'Clerk Stenographer R12' },
                },
                type: 'org-chart-card',
                position: { x: 57400, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00038563',
                data: {
                  id: '00038563',
                  title: 'Lead Software Engineer',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 57750, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00042391',
                data: {
                  id: '00042391',
                  title: 'HR Manager',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 58100, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00093866',
                data: {
                  id: '00093866',
                  title: 'Coor.Transition Planning',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181003', code: 'MGMT LV 03', name: 'Management Level 03' },
                },
                type: 'org-chart-card',
                position: { x: 58450, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030150',
                data: {
                  id: '00030150',
                  title: 'Clerk Stenographer R9',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363103', code: 'CLK ST 09R', name: 'Clerk Stenographer R9' },
                },
                type: 'org-chart-card',
                position: { x: 58800, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00079380',
                data: {
                  id: '00079380',
                  title: 'Manager, Capital Finance',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181005', code: 'MGMT LV 05', name: 'Management Level 05' },
                },
                type: 'org-chart-card',
                position: { x: 59150, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00057755',
                data: {
                  id: '00057755',
                  title: 'Financial Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551402', code: 'FO 18R', name: 'Financial Officer R18' },
                },
                type: 'org-chart-card',
                position: { x: 59675, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00067309 ',
                data: {
                  id: '00067309 ',
                  title: 'Sr. Project Management Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551505', code: 'ADMN O 24R', name: 'Administrative Officer R24' },
                },
                type: 'org-chart-card',
                position: { x: 59500, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030112',
                data: {
                  id: '00030112',
                  title: 'Sr Dir, Financial Operations',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185004', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59850, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00092685',
                data: {
                  id: '00092685',
                  title: 'Level 1 Co-op',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '361301', code: 'COOP LVL 1', name: 'Coop Education Train Prgm Lv1' },
                },
                type: 'org-chart-card',
                position: { x: 60200, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00023206',
                data: {
                  id: '00023206',
                  title: 'Fun CEO',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551104', code: 'CLK 12R', name: 'Clerk R12' },
                },
                type: 'org-chart-card',
                position: { x: 60550, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
            ],
          },
          user_id: TEST_USER_ID,
          title: 'Project Manager',
          position_number: 20002,
          classification_id: '508013',
          submission_id: 'SUB002',
          submitted_at: new Date(),
          approved_at: new Date(),
          status: 'VERIFICATION',
          updated_at: new Date(),
          classification_employee_group_id: 'GEU',
          classification_peoplesoft_id: 'BCSET',
          additional_info: {
            branch: 'branch3',
            division: 'division3',
            department_id: '004-0042',
            work_location_id: 'V8W9V1',
            work_location_name: '049-617 GOVERNMENT ST',
            excluded_mgr_position_number: '00129934',
            excluded_mgr_name: 'Bob Doe',
          },
        },
        {
          crm_id: 67890,
          crm_assigned_to_account_id: 12345,
          step: 4,
          reports_to_position_id: 'POS789',
          department_id: 'DEPT03',
          parent_job_profile_id: profile208.id,
          parent_job_profile_version: 1,
          crm_json: null,
          profile_json: {
            id: profile208.id,
            role: { id: null },
            type: 'USER',
            scope: { id: null },
            title: { value: 'Financial Analyst', disabled: false, isCustom: false },
            number: 247,
            context:
              'The job holder is part of the human resources team and is supervised by the HR Director, who sets policies for employee relations and development, offering mentorship and policy guidance.',
            streams: [],
            overview: {
              value:
                'To provide advisory services in the preparation of annual budgets; conduct proactive reporting and analysis of financial information; participate in the development and maintenance of a framework for setting, measuring, analyzing and reporting on financial performance; integrate the reporting of financial and operational results; and assess and make recommendations on the financial implications of new initiatives.',
              disabled: false,
              isCustom: false,
            },
            education: [
              {
                is_significant: true,
                is_readonly: true,
                text: 'Bachelor’s degree in Finance, Economics, Accounting, Mathematics, Statistics, or related field.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: "Master's degree in Finance, Business Administration (MBA), or related field preferred.",
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Certifications such as Chartered Financial Analyst (CFA) or Certified Public Accountant (CPA) are advantageous.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Proven work experience as a Financial Analyst, Financial Consultant, or similar role.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Strong working knowledge of financial forecasting, corporate finance, information analysis, and financial modeling techniques.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Experience with statistical analysis and financial forecasting.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Attention to detail and the ability to identify data patterns.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Good verbal and written communication skills.',
              },
              {
                is_significant: true,
                is_readonly: false,
                text: 'Advanced knowledge of Excel, including pivot tables, formulas, and charts.',
              },
            ],
            role_type: { id: null },
            reports_to: [],
            jobFamilies: [],
            preferences: [],
            professions: [],
            organizations: [],
            all_reports_to: false,
            job_experience: [],
            classifications: [
              {
                classification: {
                  id: '551404',
                  code: 'FO 21R',
                  name: 'Financial Officer R21',
                  grade: '21A',
                  employee_group_id: 'GEU',
                },
              },
            ],
            organization_id: '-1',
            review_required: false,
            accountabilities: [
              {
                text: 'Analyze financial data and create financial models for decision support.',
                is_significant: true,
                is_readonly: true,
              },
              {
                text: 'Report on financial performance and prepare for regular leadership reviews.',
                is_significant: false,
                is_readonly: false,
              },
              {
                text: 'Analyze past results, perform variance analysis, identify trends, and make recommendations for improvements.',
                is_significant: false,
                is_readonly: false,
              },
              {
                text: 'Work closely with the accounting team to ensure accurate financial reporting.',
                is_significant: false,
                is_readonly: false,
              },
              {
                text: 'Evaluate financial performance by comparing and analyzing actual results with plans and forecasts.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Guide the cost analysis process by establishing and enforcing policies and procedures.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Provide analysis of trends and forecasts and recommend actions for optimization.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Recommend actions by analyzing and interpreting data and making comparative analyses; study proposed changes in methods and materials.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Identify and drive process improvements, including the creation of standard and ad-hoc reports, tools, and Excel dashboards.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Increase productivity by developing automated reporting/forecasting tools.',
                is_significant: true,
                is_readonly: false,
              },
              {
                text: 'Market research, data mining, business intelligence, and valuation comps.',
                is_significant: true,
                is_readonly: false,
              },
            ],
            program_overview: { value: '', disabled: false, isCustom: false },
            all_organizations: true,
            security_screenings: [],
            optional_requirements: [],
            willingness_statements: [],
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
                  id: 23,
                  name: 'Problem solving and judgement',
                  description:
                    'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
                  id: 42,
                  name: 'Leadership',
                  description:
                    "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
                },
              },
            ],
            knowledge_skills_abilities: [],
            professional_registration_requirements: [],
          },
          orgchart_json: {
            edges: [
              { id: '00054345-00008599', type: 'smoothstep', source: '00054345', target: '00008599' },
              { id: '00008599-00081675', type: 'smoothstep', source: '00008599', target: '00081675' },
              { id: '00008599-00038563', type: 'smoothstep', source: '00008599', target: '00038563' },
              { id: '00008599-00042391', type: 'smoothstep', source: '00008599', target: '00042391' },
              { id: '00008599-00093866', type: 'smoothstep', source: '00008599', target: '00093866' },
              { id: '00008599-00030150', type: 'smoothstep', source: '00008599', target: '00030150' },
              { id: '00008599-00079380', type: 'smoothstep', source: '00008599', target: '00079380' },
              { id: '00126684-00057755', type: 'smoothstep', source: '00126684', target: '00057755' },
              { id: '00008599-00067309 ', type: 'smoothstep', source: '00008599', target: '00067309 ' },
              { id: '00008599-00030112', type: 'smoothstep', source: '00008599', target: '00030112' },
              { id: '00008599-00092685', type: 'smoothstep', source: '00008599', target: '00092685' },
              { id: '00008599-00023206', type: 'smoothstep', source: '00008599', target: '00023206' },
            ],
            nodes: [
              {
                id: '00008599',
                data: {
                  id: '00008599',
                  title: 'Exec Dir & Chief Fin Officer',
                  employees: [{ id: '000324', name: 'Alice Johnson', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185005', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59325, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00081675',
                data: {
                  id: '00081675',
                  title: 'Senior Project Manager',
                  employees: [{ id: '001456', name: 'Bob Smith', status: 'Active' }],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363104', code: 'CLK ST 12R', name: 'Clerk Stenographer R12' },
                },
                type: 'org-chart-card',
                position: { x: 57400, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00038563',
                data: {
                  id: '00038563',
                  title: 'Lead Software Engineer',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 57750, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00042391',
                data: {
                  id: '00042391',
                  title: 'HR Manager',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181004', code: 'MGMT LV 04', name: 'Management Level 04' },
                },
                type: 'org-chart-card',
                position: { x: 58100, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00093866',
                data: {
                  id: '00093866',
                  title: 'Coor.Transition Planning',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181003', code: 'MGMT LV 03', name: 'Management Level 03' },
                },
                type: 'org-chart-card',
                position: { x: 58450, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030150',
                data: {
                  id: '00030150',
                  title: 'Clerk Stenographer R9',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '363103', code: 'CLK ST 09R', name: 'Clerk Stenographer R9' },
                },
                type: 'org-chart-card',
                position: { x: 58800, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00079380',
                data: {
                  id: '00079380',
                  title: 'Manager, Capital Finance',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '181005', code: 'MGMT LV 05', name: 'Management Level 05' },
                },
                type: 'org-chart-card',
                position: { x: 59150, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00057755',
                data: {
                  id: '00057755',
                  title: 'Financial Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551402', code: 'FO 18R', name: 'Financial Officer R18' },
                },
                type: 'org-chart-card',
                position: { x: 59675, y: 50 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00067309 ',
                data: {
                  id: '00067309 ',
                  title: 'Sr. Project Management Analyst',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551505', code: 'ADMN O 24R', name: 'Administrative Officer R24' },
                },
                type: 'org-chart-card',
                position: { x: 59500, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00030112',
                data: {
                  id: '00030112',
                  title: 'Sr Dir, Financial Operations',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '185004', code: 'Band 4', name: 'Band 4' },
                },
                type: 'org-chart-card',
                position: { x: 59850, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00092685',
                data: {
                  id: '00092685',
                  title: 'Level 1 Co-op',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '361301', code: 'COOP LVL 1', name: 'Coop Education Train Prgm Lv1' },
                },
                type: 'org-chart-card',
                position: { x: 60200, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
              {
                id: '00023206',
                data: {
                  id: '00023206',
                  title: 'Fun CEO',
                  employees: [],
                  department: { id: '026-4240', name: 'CFO', organization_id: 'BC026' },
                  classification: { id: '551104', code: 'CLK 12R', name: 'Clerk R12' },
                },
                type: 'org-chart-card',
                position: { x: 60550, y: 300 },
                sourcePosition: 'bottom',
                targetPosition: 'top',
              },
            ],
          },
          user_id: TEST_USER_ID,
          title: 'Data Scientist',
          position_number: 30003,
          classification_id: '752203',
          submission_id: 'SUB003',
          submitted_at: new Date(),
          approved_at: new Date(),
          status: 'COMPLETED',
          updated_at: new Date(),
          classification_employee_group_id: 'GEU',
          classification_peoplesoft_id: 'BCSET',
          additional_info: {
            branch: 'branch4',
            division: 'division4',
            department_id: '039-3961',
            work_location_id: 'V5G3H302',
            work_location_name: '100 -3705 Willingdon Avenue',
            excluded_mgr_position_number: '00125168',
            excluded_mgr_name: 'Jane Doe',
          },
        },
      ],
    });
  } catch (e) {
    console.log('ERROR: failed to create positionRequest');
  }
}

// seed()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
