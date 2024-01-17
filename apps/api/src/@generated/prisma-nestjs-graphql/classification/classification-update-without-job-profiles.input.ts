import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  employee_group?: string;

  @Field(() => String, { nullable: true })
  grade?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => JobProfileReportsToUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUpdateManyWithoutClassificationNestedInput;
}
