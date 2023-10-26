import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToScalarWhereInput } from './job-profile-reports-to-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToUncheckedUpdateManyWithoutClassificationInput } from './job-profile-reports-to-unchecked-update-many-without-classification.input';

@InputType()
export class JobProfileReportsToUpdateManyWithWhereWithoutClassificationInput {
  @Field(() => JobProfileReportsToScalarWhereInput, { nullable: false })
  @Type(() => JobProfileReportsToScalarWhereInput)
  where!: JobProfileReportsToScalarWhereInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationInput)
  data!: JobProfileReportsToUncheckedUpdateManyWithoutClassificationInput;
}
