import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkUncheckedUpdateManyInput } from './job-profile-job-family-link-unchecked-update-many.input';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';

@ArgsType()
export class UpdateManyJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUncheckedUpdateManyInput)
  data!: JobProfileJobFamilyLinkUncheckedUpdateManyInput;

  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereInput)
  where?: JobProfileJobFamilyLinkWhereInput;
}
