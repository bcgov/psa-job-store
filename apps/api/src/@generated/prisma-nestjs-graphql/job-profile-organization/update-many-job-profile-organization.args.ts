import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUncheckedUpdateManyInput } from './job-profile-organization-unchecked-update-many.input';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';

@ArgsType()
export class UpdateManyJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileOrganizationUncheckedUpdateManyInput)
  data!: JobProfileOrganizationUncheckedUpdateManyInput;

  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  @Type(() => JobProfileOrganizationWhereInput)
  where?: JobProfileOrganizationWhereInput;
}
