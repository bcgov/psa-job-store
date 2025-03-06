// import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import { BehaviouralCompetencyCategory, BehaviouralCompetencyType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SYSTEM_USER_ID = '842c166d-e134-4083-8696-1f1aac28ce03';

async function seed() {
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

  await prisma.jobProfileMinimumRequirements.createMany({
    data: [
      {
        id: 1,
        requirement: 'Certificate or coursework and 6 months related experience; OR',
        grade: '09A',
      },
      {
        id: 2,
        requirement: 'Secondary School graduation (Dogwood, GED) and 6 months related experience; OR',
        grade: '09A',
      },
      {
        id: 3,
        requirement: 'Evergreen and 1 year related experience; OR',
        grade: '09A',
      },
      {
        id: 4,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '09A',
      },
      {
        id: 5,
        requirement: 'Diploma and no formal experience; OR',
        grade: '11A',
      },
      {
        id: 6,
        requirement: 'Certificate or coursework and 6 months related experience; OR',
        grade: '11A',
      },
      {
        id: 7,
        requirement: 'Secondary School graduation (Dogwood, GED) and 1 year related experience; OR',
        grade: '11A',
      },
      {
        id: 8,
        requirement: 'Evergreen and 2 years related experience; OR',
        grade: '11A',
      },
      {
        id: 9,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '11A',
      },
      {
        id: 10,
        requirement: 'Bachelor’s Degree and no formal work experience; OR',
        grade: '13A',
      },
      {
        id: 11,
        requirement: 'Diploma and 6 months related experience; OR',
        grade: '13A',
      },
      {
        id: 12,
        requirement: 'Certificate or coursework and 1 year related experience; OR',
        grade: '13A',
      },
      {
        id: 13,
        requirement: 'Secondary School graduation (Dogwood, GED) and 2 years related experience; OR',
        grade: '13A',
      },
      {
        id: 14,
        requirement: 'Evergreen and 3 years related experience; OR',
        grade: '13A',
      },
      {
        id: 15,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '13A',
      },
      {
        id: 16,
        requirement: 'Bachelor’s Degree and no formal work experience; OR',
        grade: '15A',
      },
      {
        id: 17,
        requirement: 'Diploma and 6 months related experience; OR',
        grade: '15A',
      },
      {
        id: 18,
        requirement: 'Certificate or coursework and 1 year related experience; OR',
        grade: '15A',
      },
      {
        id: 19,
        requirement: 'Secondary School graduation (Dogwood, GED) and 2 years related experience; OR',
        grade: '15A',
      },
      {
        id: 20,
        requirement: 'Evergreen and 3 years related experience; OR',
        grade: '15A',
      },
      {
        id: 21,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '15A',
      },
      {
        id: 22,
        requirement: 'Master’s degree and no formal work experience',
        grade: '18A',
      },
      {
        id: 23,
        requirement: 'Bachelor’s Degree and 6 months of related experience; OR',
        grade: '18A',
      },
      {
        id: 24,
        requirement: 'Diploma and 1 year related experience; OR',
        grade: '18A',
      },
      {
        id: 25,
        requirement: 'Certificate or coursework and 2 years related experience; OR',
        grade: '18A',
      },
      {
        id: 26,
        requirement: 'Secondary School graduation (Dogwood, GED) and 3 years related experience; OR',
        grade: '18A',
      },
      {
        id: 27,
        requirement: 'Evergreen and 4 years related experience OR',
        grade: '18A',
      },
      {
        id: 28,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '18A',
      },
      {
        id: 29,
        requirement: 'Master’s degree and six months of related experience',
        grade: '21A',
      },
      {
        id: 30,
        requirement: 'Bachelor’s Degree and 1 year of related experience; OR',
        grade: '21A',
      },
      {
        id: 31,
        requirement: 'Diploma and 2 years related experience; OR',
        grade: '21A',
      },
      {
        id: 32,
        requirement: 'Certificate or coursework and 3 years related experience; OR',
        grade: '21A',
      },
      {
        id: 33,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '21A',
      },
      {
        id: 34,
        requirement: 'Master’s degree and 1 year of related experience',
        grade: '24A',
      },
      {
        id: 35,
        requirement: 'Bachelor’s Degree and 2 years of related experience; OR',
        grade: '24A',
      },
      {
        id: 36,
        requirement: 'Diploma and 3 years related experience; OR',
        grade: '24A',
      },
      {
        id: 37,
        requirement: 'Certificate or coursework and 4 years related experience; OR',
        grade: '24A',
      },
      {
        id: 38,
        requirement: 'An equivalent combination of education and experience may be considered.',
        grade: '24A',
      },
      {
        id: 39,
        requirement: 'Master’s degree and 2 years of related experience',
        grade: '27A',
      },
      {
        id: 40,
        requirement: 'Bachelor’s Degree and 3 years of related experience; OR',
        grade: '27A',
      },
      {
        id: 41,
        requirement: 'Diploma and 4 years related experience; OR',
        grade: '27A',
      },
      {
        id: 42,
        requirement: 'Certificate or coursework and 5 years related experience; OR',
        grade: '27A',
      },
      {
        id: 43,
        requirement: 'An equivalent combination of education and experience may be considered.',
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
    ],
  });

  await prisma.employeeGroup.createMany({
    data: [
      { id: 'GEU', name: "BC General Employees' Union" },
      { id: 'MGT', name: 'Management' },
      { id: 'OEX', name: 'Schedule A' },
      { id: 'PEA', name: 'Professional Employees Association' },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
