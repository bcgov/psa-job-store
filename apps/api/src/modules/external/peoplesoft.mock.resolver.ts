// mock-incident.resolver.ts
import { Args, Field, InputType, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { PeoplesoftService } from './peoplesoft.service';

@ObjectType()
class MockPosition {
  @Field()
  positionNbr: string;

  @Field()
  effdt: string;

  @Field()
  effStatus: string;

  @Field()
  descr: string;

  @Field()
  descrshort: string;

  @Field()
  businessUnit: string;

  @Field()
  deptid: string;

  @Field()
  deptDescr: string;

  @Field()
  jobcode: string;

  @Field()
  posnStatus: string;

  @Field()
  statusDt: string;

  @Field()
  reportsTo: string;

  @Field()
  salAdminPlan: string;

  @Field()
  tgbEClass: string;

  @Field()
  location: string;
}

@InputType()
export class UpdateMockPositionInput {
  @Field({ nullable: true })
  DESCR?: string;

  @Field({ nullable: true })
  BUSINESS_UNIT?: string;

  @Field({ nullable: true })
  DEPTID?: string;

  @Field({ nullable: true })
  JOBCODE?: string;

  @Field({ nullable: true })
  POSN_STATUS?: string;

  @Field({ nullable: true })
  REPORTS_TO?: string;

  @Field({ nullable: true })
  TGB_E_CLASS?: string;

  @Field({ nullable: true })
  LOCATION?: string;
}

@Resolver(() => MockPosition)
export class MockPeopleSoftResolver {
  constructor(private readonly mockPeoplesoftService: PeoplesoftService) {}

  @Mutation(() => MockPosition, { nullable: true })
  async updatePosition(
    @Args('positionNbr') positionNbr: string,
    @Args('data', { type: () => UpdateMockPositionInput }) data: UpdateMockPositionInput,
  ) {
    console.log('updatePosition called with positionNbr:', positionNbr, 'data:', data);
    return this.mockPeoplesoftService.updateMockPosition(positionNbr, data);
  }

  @Mutation(() => Boolean)
  async resetMockPSData() {
    return this.mockPeoplesoftService.resetMockData();
  }
}
