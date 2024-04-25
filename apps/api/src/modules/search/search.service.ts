import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export enum SearchIndex {
  JobProfile = 'job-profile',
}

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly prisma: PrismaService,
  ) {}

  private query(index: SearchIndex, value: string): QueryDslQueryContainer {
    switch (index) {
      case SearchIndex.JobProfile: {
        return {
          multi_match: {
            query: value,
            fields: ['title', 'context', 'overview'],
            fuzziness: 1,
          },
        };
      }
      default:
        return {};
    }
  }

  async searchJobProfiles(value: string) {
    const results = await this.elasticService.search({
      index: SearchIndex.JobProfile,
      query: {
        bool: {
          should: [
            {
              match_phrase_prefix: {
                title: value,
              },
            },
            {
              match: {
                title: {
                  query: value,
                  fuzziness: 1,
                  operator: 'and',
                },
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

    return results.hits.hits.map((h) => +h._id);
  }

  async updateJobProfileSearchIndex(job_profile_id: number) {
    const profile = await this.prisma.jobProfile.findUnique({
      where: { id: job_profile_id },
      include: { context: true },
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
        context: profile.context?.description,
        overview: profile.overview,
        // requirements: profile.requirements,
        education: (profile.education as Prisma.JsonObject[]).map((education) => education.text),
        job_experience: (profile.job_experience as Prisma.JsonObject[]).map((experience) => experience.text),

        accountabilities: (profile.accountabilities as Prisma.JsonObject[]).map(
          (accountability) => accountability.text,
        ),
        behavioural_competencies: (
          await this.prisma.jobProfileBehaviouralCompetency.findMany({
            where: {
              job_profile_id: profile.id,
            },
            select: {
              behavioural_competency: {
                select: {
                  name: true,
                  description: true,
                },
              },
            },
          })
        ).map(({ behavioural_competency: { name, description } }) => `${name} ${description}`),
        professional_registration_requirements: profile.professional_registration_requirements,
        preferences: profile.preferences,
        knowledge_skills_abilities: profile.knowledge_skills_abilities,
        willingness_statements: profile.willingness_statements,
        optional_requirements: profile.optional_requirements,
        security_screenings: profile.security_screenings,
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
