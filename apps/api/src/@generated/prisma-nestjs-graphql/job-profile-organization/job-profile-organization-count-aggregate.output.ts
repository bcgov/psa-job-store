import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileOrganizationCountAggregate {
  @Field(() => Int, { nullable: false })
  organization_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
