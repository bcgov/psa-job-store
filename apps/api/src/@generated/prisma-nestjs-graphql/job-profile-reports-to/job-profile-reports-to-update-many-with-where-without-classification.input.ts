import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToScalarWhereInput } from './job-profile-reports-to-scalar-where.input';
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
