import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutFamilyInput } from '../job-profile/job-profile-create-nested-many-without-family.input';

@InputType()
export class JobFamilyCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutFamilyInput, { nullable: true })
  profiles?: JobProfileCreateNestedManyWithoutFamilyInput;
}
