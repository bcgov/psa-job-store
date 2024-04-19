import { Field, InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationRelationFilter {
  @Field(() => OrganizationWhereInput, { nullable: true })
  is?: OrganizationWhereInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  isNot?: OrganizationWhereInput;
}
