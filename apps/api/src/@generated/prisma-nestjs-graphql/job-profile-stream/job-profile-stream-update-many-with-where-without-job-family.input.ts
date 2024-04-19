import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamScalarWhereInput } from './job-profile-stream-scalar-where.input';
import { JobProfileStreamUpdateManyMutationInput } from './job-profile-stream-update-many-mutation.input';

@InputType()
export class JobProfileStreamUpdateManyWithWhereWithoutJob_familyInput {
  @Field(() => JobProfileStreamScalarWhereInput, { nullable: false })
  @Type(() => JobProfileStreamScalarWhereInput)
  where!: JobProfileStreamScalarWhereInput;

  @Field(() => JobProfileStreamUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateManyMutationInput)
  data!: JobProfileStreamUpdateManyMutationInput;
}
