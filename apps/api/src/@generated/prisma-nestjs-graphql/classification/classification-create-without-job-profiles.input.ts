import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateNestedManyWithoutClassificationInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  employee_group!: string;

  @Field(() => String, { nullable: false })
  grade!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutClassificationInput, { nullable: true })
  reportees?: JobProfileReportsToCreateNestedManyWithoutClassificationInput;
}
