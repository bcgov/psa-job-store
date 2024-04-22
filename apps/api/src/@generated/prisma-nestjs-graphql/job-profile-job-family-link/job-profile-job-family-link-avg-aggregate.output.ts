import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyLinkAvgAggregate {
  @Field(() => Float, { nullable: true })
  jobProfileId?: number;

  @Field(() => Float, { nullable: true })
  jobFamilyId?: number;
}
