import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutDependent_job_profilesInput } from '../classification/classification-create-nested-one-without-dependent-job-profiles.input';

@InputType()
export class JobProfileReportsToCreateWithoutJob_profileInput {
  @Field(() => ClassificationCreateNestedOneWithoutDependent_job_profilesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutDependent_job_profilesInput;
}
