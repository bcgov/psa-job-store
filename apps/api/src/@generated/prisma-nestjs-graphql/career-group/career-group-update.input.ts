import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutCareer_groupNestedInput } from '../job-profile/job-profile-update-many-without-career-group-nested.input';

@InputType()
export class CareerGroupUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutCareer_groupNestedInput, { nullable: true })
  profiles?: JobProfileUpdateManyWithoutCareer_groupNestedInput;
}
