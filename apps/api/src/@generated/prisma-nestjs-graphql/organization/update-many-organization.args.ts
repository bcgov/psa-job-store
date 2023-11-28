import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationUpdateManyMutationInput } from './organization-update-many-mutation.input';
import { Type } from 'class-transformer';
import { OrganizationWhereInput } from './organization-where.input';

@ArgsType()
export class UpdateManyOrganizationArgs {
  @Field(() => OrganizationUpdateManyMutationInput, { nullable: false })
  @Type(() => OrganizationUpdateManyMutationInput)
  data!: OrganizationUpdateManyMutationInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
