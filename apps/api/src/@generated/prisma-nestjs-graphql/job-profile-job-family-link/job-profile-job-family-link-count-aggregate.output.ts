import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyLinkCountAggregate {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
