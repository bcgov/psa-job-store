import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrganizationCount {
  @Field(() => Int, { nullable: false })
  departments?: number;

  @Field(() => Int, { nullable: false })
  JobProfileOrganization?: number;
}
