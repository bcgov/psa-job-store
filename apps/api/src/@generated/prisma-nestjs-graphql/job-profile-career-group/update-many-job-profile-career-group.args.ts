import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupUpdateManyMutationInput } from './job-profile-career-group-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';

@ArgsType()
export class UpdateManyJobProfileCareerGroupArgs {
  @Field(() => JobProfileCareerGroupUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileCareerGroupUpdateManyMutationInput)
  data!: JobProfileCareerGroupUpdateManyMutationInput;

  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  where?: JobProfileCareerGroupWhereInput;
}
