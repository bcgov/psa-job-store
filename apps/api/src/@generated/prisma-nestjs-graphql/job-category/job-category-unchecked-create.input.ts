import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutCategoryInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-category.input';

@InputType()
export class JobCategoryUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutCategoryInput, { nullable: true })
  profiles?: JobProfileUncheckedCreateNestedManyWithoutCategoryInput;
}
