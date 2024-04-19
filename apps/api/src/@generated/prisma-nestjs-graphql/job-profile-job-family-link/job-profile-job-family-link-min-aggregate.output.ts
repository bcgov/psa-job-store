import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyLinkMinAggregate {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  jobFamilyId?: number;
}
