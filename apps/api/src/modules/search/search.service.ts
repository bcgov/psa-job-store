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
          ],
        },
      },
    });

    return results.hits.hits.map((h) => +h._id);
  }
}
