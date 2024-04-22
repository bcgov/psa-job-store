import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateManyMutationInput } from './job-profile-update-many-mutation.input';
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
