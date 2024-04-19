import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationWhereInput } from './organization-where.input';

@ArgsType()
export class DeleteManyOrganizationArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
