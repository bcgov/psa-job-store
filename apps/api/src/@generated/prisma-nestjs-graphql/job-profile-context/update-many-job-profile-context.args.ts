import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileContextUpdateManyMutationInput } from './job-profile-context-update-many-mutation.input';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@ArgsType()
export class UpdateManyJobProfileContextArgs {
  @Field(() => JobProfileContextUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileContextUpdateManyMutationInput)
  data!: JobProfileContextUpdateManyMutationInput;

  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;
}
