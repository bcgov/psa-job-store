import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationUpdateManyMutationInput } from './organization-update-many-mutation.input';
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
