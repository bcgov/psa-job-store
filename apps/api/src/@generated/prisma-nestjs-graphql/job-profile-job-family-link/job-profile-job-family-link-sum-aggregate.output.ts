import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyLinkSumAggregate {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  jobFamilyId?: number;
}
