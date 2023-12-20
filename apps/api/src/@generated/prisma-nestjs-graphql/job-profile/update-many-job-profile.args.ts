import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileUpdateManyMutationInput } from './job-profile-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobProfileWhereInput } from './job-profile-where.input';

@ArgsType()
export class UpdateManyJobProfileArgs {
  @Field(() => JobProfileUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileUpdateManyMutationInput)
  data!: JobProfileUpdateManyMutationInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
