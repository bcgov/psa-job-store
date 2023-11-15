import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyOrganizationArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
