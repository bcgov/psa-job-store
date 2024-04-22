import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';
import { JobProfileUpdateManyMutationInput } from './job-profile-update-many-mutation.input';

@InputType()
export class JobProfileUpdateManyWithWhereWithoutRole_typeInput {
  @Field(() => JobProfileScalarWhereInput, { nullable: false })
  @Type(() => JobProfileScalarWhereInput)
  where!: JobProfileScalarWhereInput;

  @Field(() => JobProfileUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileUpdateManyMutationInput)
  data!: JobProfileUpdateManyMutationInput;
}
