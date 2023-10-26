import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutFamilyNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-family-nested.input';

@InputType()
export class JobFamilyUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutFamilyNestedInput, { nullable: true })
  profiles?: JobProfileUncheckedUpdateManyWithoutFamilyNestedInput;
}
