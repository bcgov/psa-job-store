import { Field, InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileOrganizationScalarWhereInput {
  @Field(() => [JobProfileOrganizationScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileOrganizationScalarWhereInput>;

  @Field(() => [JobProfileOrganizationScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileOrganizationScalarWhereInput>;

  @Field(() => [JobProfileOrganizationScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileOrganizationScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;
}
