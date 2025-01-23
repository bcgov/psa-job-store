/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { exec } from 'child_process';
import { PublicRoute } from '../auth/decorators/public-route.decorator';
import { TestEnvironmentGuard } from '../auth/guards/test-environment.guard';
import { SearchService } from '../search/search.service';

import * as fs from 'fs';
import { promisify } from 'util';
import { E2EAuthGuard } from '../auth/guards/e2e-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

const execAsync = promisify(exec);

@Controller('health')
export class HealthCheckController {
  constructor(
    private readonly searchService: SearchService,
    private readonly prisma: PrismaService,
  ) {}

  @PublicRoute()
  @Get('check')
  async checkReadiness() {
    // Perform any necessary checks here
    return { status: 'ok' };
  }

  @PublicRoute()
  @Get('gitsha')
  async gitsha() {
    // Perform any necessary checks here
    return {
      status: 'ok',
      version: process.env.GIT_SHA || 'development',
      timestamp: new Date().toISOString(),
    };
  }

  @PublicRoute()
  @Get('resetIndex')
  @UseGuards(TestEnvironmentGuard)
  async resetIndex() {
    await this.searchService.resetIndex();
    return {
      status: 'ok',
    };
  }

  @PublicRoute()
  @Get('dumpCreateSchema')
  @UseGuards(E2EAuthGuard)
  async dumpCreateSchema() {
    try {
      const tempFile = '/tmp/log/schema.sql';

      // Generate the schema SQL file
      const { stderr } = await execAsync(
        `npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > ${tempFile}`,
      );

      if (stderr) {
        throw new Error(`Schema dump failed...: ${stderr}`);
      }

      // Read the generated file
      const schemaContent = await fs.promises.readFile(tempFile, 'utf8');

      return {
        status: 'ok',
        schema: schemaContent,
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error?.message,
      };
    }
  }

  @PublicRoute()
  @Get('testLoad')
  @UseGuards(E2EAuthGuard)
  async testLoad() {
    const data = await this.prisma.currentJobProfile.findMany({
      take: 20,
    });
    return data;
  }

  @PublicRoute()
  @Get('testLoadNoDB')
  @UseGuards(E2EAuthGuard)
  async testLoadNoDB() {
    return [
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
        context:
          "This role is directly accountable to the Senior Marketing Manager, who oversees the marketing department's strategies and execution, offering strategic guidance and performance feedback.",
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
        job_experience: [],
        behavioural_competencies: [
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.783Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.794Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.804Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
          {
            id: 42,
            name: 'Leadership',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
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
        valid_from: '2025-01-15T16:50:50.809Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.788Z',
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
            id: 35,
            name: 'Service orientation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.777Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.798Z',
        valid_to: null,
        version: 1,
      },
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
        context:
          "This role is directly accountable to the Senior Marketing Manager, who oversees the marketing department's strategies and execution, offering strategic guidance and performance feedback.",
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
        job_experience: [],
        behavioural_competencies: [
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.783Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.794Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.804Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
          {
            id: 42,
            name: 'Leadership',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
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
        valid_from: '2025-01-15T16:50:50.809Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.788Z',
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
            id: 35,
            name: 'Service orientation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.777Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.798Z',
        valid_to: null,
        version: 1,
      },
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
        context:
          "This role is directly accountable to the Senior Marketing Manager, who oversees the marketing department's strategies and execution, offering strategic guidance and performance feedback.",
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
        job_experience: [],
        behavioural_competencies: [
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.783Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.794Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.804Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
          {
            id: 42,
            name: 'Leadership',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
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
        valid_from: '2025-01-15T16:50:50.809Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.788Z',
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
            id: 35,
            name: 'Service orientation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.777Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.798Z',
        valid_to: null,
        version: 1,
      },
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
        context:
          "This role is directly accountable to the Senior Marketing Manager, who oversees the marketing department's strategies and execution, offering strategic guidance and performance feedback.",
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
        job_experience: [],
        behavioural_competencies: [
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.783Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.794Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.804Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
          },
          {
            id: 42,
            name: 'Leadership',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              "implies a desire to lead others, including diverse teams. Leadership is generally, but not always, demonstrated from a position of formal authority. The 'team' here should be understood broadly as any group with which the person interacts regularly.",
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
        valid_from: '2025-01-15T16:50:50.809Z',
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
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 41,
            name: 'Holding people accountable',
            type: 'INCLUDED',
            category: 'LEADING_PEOPLE',
            description:
              'involves setting high standards of performance and holding team members, other government jurisdictions, outside contractors, industry agencies, etc., accountable for results and actions.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.788Z',
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
            id: 35,
            name: 'Service orientation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'implies a desire to identify and serve customers/clients, who may include the public, coworkers, other branches/divisions, other ministries/agencies, other government organizations and non-government organizations. It means focusing one’s efforts on discovering and meeting the needs of the customer/client.',
          },
          {
            id: 36,
            name: 'Teamwork and cooperation',
            type: 'INCLUDED',
            category: 'INTERPERSONAL_RELATIONSHIPS',
            description:
              'is the ability to work cooperatively within diverse teams, work groups and across the organization to achieve group and organizational goals. It includes the desire and ability to understand and respond effectively to other people from diverse backgrounds with diverse views.',
          },
          {
            id: 45,
            name: 'Concern for order',
            type: 'INCLUDED',
            category: 'PERSONAL_EFFECTIVENESS',
            description:
              "reflects an underlying drive to reduce uncertainty in the surrounding environment. It's expressed as monitoring and checking work or information, insisting on clarity of roles and functions, etc.",
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
        valid_from: '2025-01-15T16:50:50.777Z',
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
            id: 17,
            name: 'Business acumen',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand the business implications of decisions and the ability to strive to improve organizational performance. It requires an awareness of business issues, processes and outcomes as they impact the client’s and the organization’s business needs.',
          },
          {
            id: 21,
            name: 'Managing organizational resources',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to understand and effectively manage organizational resources (for example: people, materials, assets, budgets). This is demonstrated through measurement, planning and control of resources to maximize results. It requires an evaluation of qualitative (for example: client satisfaction) and quantitative (for example: service costs) needs.',
          },
          {
            id: 22,
            name: 'Planning, organizing and coordinating',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              "involves proactively planning, establishing priorities and allocating resources. It's expressed by developing and implementing increasingly complex plans. It also involves monitoring and adjusting work to accomplish goals and deliver to the organization’s mandate.",
          },
          {
            id: 23,
            name: 'Problem solving and judgement',
            type: 'INCLUDED',
            category: 'ACHIEVING_BUSINESS_RESULTS',
            description:
              'is the ability to analyze problems systematically, organize information, identify key factors, identify underlying causes and generate solutions.',
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
        valid_from: '2025-01-15T16:50:50.798Z',
        valid_to: null,
        version: 1,
      },
    ];
  }
}
