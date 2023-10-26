import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutCategoryNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-category-nested.input';

@InputType()
export class JobCategoryUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutCategoryNestedInput, { nullable: true })
  profiles?: JobProfileUncheckedUpdateManyWithoutCategoryNestedInput;
}
