import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationCreateInput } from './organization-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneOrganizationArgs {
  @Field(() => OrganizationCreateInput, { nullable: false })
  @Type(() => OrganizationCreateInput)
  data!: OrganizationCreateInput;
}
