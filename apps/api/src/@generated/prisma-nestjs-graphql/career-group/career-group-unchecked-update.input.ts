import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutCareer_groupNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-career-group-nested.input';

@InputType()
export class CareerGroupUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutCareer_groupNestedInput, { nullable: true })
  profiles?: JobProfileUncheckedUpdateManyWithoutCareer_groupNestedInput;
}
