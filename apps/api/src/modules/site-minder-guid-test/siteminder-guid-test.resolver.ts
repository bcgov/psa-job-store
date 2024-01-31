import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { SiteMinderGuidTestApiService, TestApiResponse } from './siteminder-guid-test.service';

@Resolver()
export class SiteMinderGuidTestApiResolver {
  // Test with:
  //   query TestQuery {
  //     testQuery(url: "google.com") {
  //         info
  //         headers
  //         method
  //         url
  //     }
  // }

  constructor(private externalApiService: SiteMinderGuidTestApiService) {}

  @Query(() => TestApiResponse)
  async testQuery(@Args('url') url: string, @Context('req') req: Request) {
    const response = await this.externalApiService.sendRequestWithUserGuid(req, url, 'GET');
    return response;
  }
}
