import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateManyMutationInput } from './job-profile-update-many-mutation.input';

@InputType()
export class JobProfileUpdateManyWithWhereWithoutOrganizationInput {
  @Field(() => JobProfileScalarWhereInput, { nullable: false })
  @Type(() => JobProfileScalarWhereInput)
  where!: JobProfileScalarWhereInput;

  @Field(() => JobProfileUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileUpdateManyMutationInput)
  data!: JobProfileUpdateManyMutationInput;
}
