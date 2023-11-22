import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

type SearchIndex = 'job-profile';

@Injectable()
export class SearchService {
  constructor(private readonly elasticService: ElasticsearchService) {}

  private query(index: SearchIndex, value: string): QueryDslQueryContainer {
    switch (index) {
      case 'job-profile': {
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
      index: 'job-profile',
      query: {
        bool: {
          should: [
            {
              match: {
                title: {
                  query: value,
                  operator: 'and',
                },
              },
            },
            {
              match: {
                context: {
                  query: value,
                  operator: 'and',
                },
              },
            },
            {
              match: {
                overview: {
                  query: value,
                  operator: 'and',
                },
              },
            },
            {
              match: {
                requirements: {
                  query: value,
                  operator: 'and',
                },
              },
            },
            {
              nested: {
                path: 'accountabilities',
                query: {
                  match: {
                    'accountabilities.optional': value,
                  },
                },
              },
            },
            {
              nested: {
                path: 'accountabilities',
                query: {
                  match: {
                    'accountabilities.required': value,
                  },
                },
              },
            },
            {
              match: {
                behavioural_competencies: {
                  query: value,
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
}
