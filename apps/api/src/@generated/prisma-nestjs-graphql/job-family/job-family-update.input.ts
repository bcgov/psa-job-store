import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutFamilyNestedInput } from '../job-profile/job-profile-update-many-without-family-nested.input';

@InputType()
export class JobFamilyUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutFamilyNestedInput, { nullable: true })
  profiles?: JobProfileUpdateManyWithoutFamilyNestedInput;
}
