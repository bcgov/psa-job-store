import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyUpdateManyMutationInput } from './job-profile-job-family-update-many-mutation.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@ArgsType()
export class UpdateManyJobProfileJobFamilyArgs {
  @Field(() => JobProfileJobFamilyUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateManyMutationInput)
  data!: JobProfileJobFamilyUpdateManyMutationInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;
}
