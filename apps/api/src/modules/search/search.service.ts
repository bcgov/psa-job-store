import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { JobProfileState, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export enum SearchIndex {
  JobProfile = 'job-profile',
  SettingsDocument = '93eb5277-f780-43c7-94e3-d857bc75a27a',
}

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly prisma: PrismaService,
    // private readonly eventsService: EventsService,
  ) {
    // console.log('searchServcie constructor');
    // this.eventsService.on('search:resetIndex', async (data) => {
    //   console.log('received search:resetIndex event');
    //   await this.resetIndex();
    //   console.log('done resetting index');
    // });
  }

  async onModuleInit() {}

  async onApplicationBootstrap() {
    // onApplicationBootstrap fires later in the lifecycle than onModuleInit
    // this way prisma client is fully initialized before we start using it.
    // console.log('application bootstrap reset index');
    await this.resetIndex();
  }

  async indexDocument(index: SearchIndex, id: string, document: Record<string, any>) {
    await this.elasticService.index({ index, id, document });
  }

  async search(index: SearchIndex, query?: QueryDslQueryContainer) {
    const results = await this.elasticService.search({ index, query });
    return results;
  }

  async deleteDocument(index: SearchIndex, id: string) {
    try {
      await this.elasticService.delete({ index, id });
    } catch (error) {}
  }

  async resetIndex() {
    try {
      // console.log('resetting index..');

      const indexExists = await this.elasticService.indices.exists({ index: SearchIndex.JobProfile });
      if (indexExists === true) {
        await this.elasticService.indices.delete({ index: SearchIndex.JobProfile });
      }
      await this.elasticService.indices.create({
        index: SearchIndex.JobProfile,
      });

      const jobProfiles = await this.prisma.currentJobProfile.findMany({
        select: { id: true },
        where: { state: { equals: JobProfileState.PUBLISHED } },
      });

      for await (const profile of jobProfiles) {
        await this.updateJobProfileSearchIndex(profile.id);
      }
    } catch (error) {
      console.error('ERROR during reset and reindex: ', error);
    }
  }

  // private query(index: SearchIndex, value: string): QueryDslQueryContainer {
  //   switch (index) {
  //     case SearchIndex.JobProfile: {
  //       return {
  //         multi_match: {
  //           query: value,
  //           fields: ['title', 'context', 'overview'],
  //           fuzziness: 1,
  //         },
  //       };
  //     }
  //     default:
  //       return {};
  //   }
  // }

  async searchJobProfiles(value: string) {
    // console.log('searchProfiles: ', value);
    const isNumber = !isNaN(parseInt(value));
    // console.log('search is a number: ', isNumber);
    const results = await this.elasticService.search({
      index: SearchIndex.JobProfile,
      query: {
        bool: {
          should: [
            {
              match_phrase_prefix: {
                title: { query: value, boost: 10 }, // exact title match
              },
            },
            {
              match: {
                title: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                  boost: 5, // fuzzy title match
                },
              },
            },
            isNumber && {
              term: {
                number: { value: parseInt(value), boost: 100 },
              },
            },
            {
              match_phrase_prefix: {
                context: value,
              },
            },
            {
              match: {
                context: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                overview: value,
              },
            },
            {
              match: {
                overview: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                requirements: value,
              },
            },
            {
              match: {
                requirements: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                'accountabilities.optional': value,
              },
            },
            {
              match: {
                'accountabilities.optional': {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                'accountabilities.required': value,
              },
            },
            {
              match: {
                'accountabilities.required': {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                behavioural_competencies: value,
              },
            },
            {
              match: {
                behavioural_competencies: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                professional_registration_requirements: value,
              },
            },
            {
              match: {
                professional_registration_requirements: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                knowledge_skills_abilities: value,
              },
            },
            {
              match: {
                knowledge_skills_abilities: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                willingness_statements: value,
              },
            },
            {
              match: {
                willingness_statements: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                optional_requirements: value,
              },
            },
            {
              match: {
                optional_requirements: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                security_screenings: value,
              },
            },
            {
              match: {
                security_screenings: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                classifications: value,
              },
            },
            {
              match: {
                classifications: {
                  query: value,
                  fuzziness: 0,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                organizations: value,
              },
            },
            {
              match: {
                organizations: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                jobFamilies: value,
              },
            },
            {
              match: {
                jobFamilies: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
            {
              match_phrase_prefix: {
                streams: value,
              },
            },
            {
              match: {
                streams: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
              },
            },
          ],
        },
      },
    });

    // console.log(
    //   'results: ',
    //   results.hits.hits.map((h) => h._id),
    // );
    return results.hits.hits.map((h) => +h._id);
  }

  async updateJobProfileSearchIndex(job_profile_id: number) {
    const profile = await this.prisma.currentJobProfile.findUnique({
      where: { id: job_profile_id },
    });

    // If profile doesn't exist, or it is in DRAFT or UNPUBLISHED state, delete it from the search index
    if (profile == null || ['DRAFT', 'UNPUBLISHED'].includes(profile.state)) {
      const documentExists = await this.elasticService.exists({
        index: SearchIndex.JobProfile,
        id: `${job_profile_id}`,
      });
      if (documentExists) await this.elasticService.delete({ index: SearchIndex.JobProfile, id: `${job_profile_id}` });

      return;
    }

    // Create/Update search index with latest version of document
    await this.elasticService.index({
      index: 'job-profile',
      id: `${profile.id}`,
      document: {
        title: profile.title,
        number: profile.number,
        context: profile.context,
        overview: profile.overview,
        // requirements: profile.requirements,
        education: (profile.education as Prisma.JsonObject[]).map((education) => education.text),
        job_experience: (profile.job_experience as Prisma.JsonObject[]).map((experience) => experience.text),

        accountabilities: (profile.accountabilities as Prisma.JsonObject[]).map(
          (accountability) => accountability.text,
        ),
        behavioural_competencies: profile.behavioural_competencies
          ? (profile.behavioural_competencies as Prisma.JsonObject[]).map(
              (competency) => `${competency.name} ${competency.description}`,
            )
          : [],

        // (
        //   await this.prisma.jobProfileBehaviouralCompetency.findMany({
        //     where: {
        //       job_profile_id: profile.id,
        //     },
        //     select: {
        //       behavioural_competency: {
        //         select: {
        //           name: true,
        //           description: true,
        //         },
        //       },
        //     },
        //   })
        // ).map(({ behavioural_competency: { name, description } }) => `${name} ${description}`),
        professional_registration_requirements: (
          profile.professional_registration_requirements as Prisma.JsonObject[]
        )?.map((pr) => pr.text),
        preferences: (profile.preferences as Prisma.JsonObject[])?.map((pr) => pr.text),
        knowledge_skills_abilities: (profile.knowledge_skills_abilities as Prisma.JsonObject[])?.map((pr) => pr.text),
        willingness_statements: (profile.willingness_statements as Prisma.JsonObject[])?.map((pr) => pr.text),
        optional_requirements: profile.optional_requirements,
        security_screenings: (profile.security_screenings as Prisma.JsonObject[])?.map((pr) => pr.text),
        classifications: (
          await this.prisma.jobProfileClassification.findMany({
            where: {
              job_profile_id: profile.id,
            },
            select: {
              classification: {
                select: {
                  name: true,
                  code: true,
                },
              },
            },
          })
        ).map(({ classification: { name, code } }) => `${name} ${code}`),
        organizations: (
          await this.prisma.jobProfileOrganization.findMany({
            where: {
              job_profile_id: profile.id,
            },
            select: {
              organization: {
                select: {
                  name: true,
                  code: true,
                },
              },
            },
          })
        ).map(({ organization: { name, code } }) => `${name} ${code}`),
        jobFamilies: (
          await this.prisma.jobProfileJobFamilyLink.findMany({
            where: {
              jobProfileId: profile.id,
            },
            select: {
              jobFamily: {
                select: {
                  name: true,
                },
              },
            },
          })
        ).map(({ jobFamily: { name } }) => `${name}`),
        streams: (
          await this.prisma.jobProfileStreamLink.findMany({
            where: {
              jobProfileId: profile.id,
            },
            select: {
              stream: {
                select: {
                  name: true,
                },
              },
            },
          })
        ).map(({ stream: { name } }) => `${name}`),
        program_overview: profile.program_overview,
      },
    });
  }
}
