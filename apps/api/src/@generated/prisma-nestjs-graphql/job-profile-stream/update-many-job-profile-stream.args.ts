import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamUpdateManyMutationInput } from './job-profile-stream-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@ArgsType()
export class UpdateManyJobProfileStreamArgs {
  @Field(() => JobProfileStreamUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateManyMutationInput)
  data!: JobProfileStreamUpdateManyMutationInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;
}
