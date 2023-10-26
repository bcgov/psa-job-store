import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutCategoryNestedInput } from '../job-profile/job-profile-update-many-without-category-nested.input';

@InputType()
export class JobCategoryUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutCategoryNestedInput, { nullable: true })
  profiles?: JobProfileUpdateManyWithoutCategoryNestedInput;
}
