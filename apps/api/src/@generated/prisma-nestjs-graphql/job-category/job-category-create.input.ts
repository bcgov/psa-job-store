import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutCategoryInput } from '../job-profile/job-profile-create-nested-many-without-category.input';

@InputType()
export class JobCategoryCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutCategoryInput, { nullable: true })
  profiles?: JobProfileCreateNestedManyWithoutCategoryInput;
}
