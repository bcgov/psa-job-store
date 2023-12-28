import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateManyMutationInput } from './job-profile-job-family-update-many-mutation.input';
import { Type } from 'class-transformer';
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
