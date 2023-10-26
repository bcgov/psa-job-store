import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToScalarWhereInput } from './job-profile-reports-to-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToUncheckedUpdateManyWithoutJob_profileInput } from './job-profile-reports-to-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileReportsToUpdateManyWithWhereWithoutJob_profileInput {
  @Field(() => JobProfileReportsToScalarWhereInput, { nullable: false })
  @Type(() => JobProfileReportsToScalarWhereInput)
  where!: JobProfileReportsToScalarWhereInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileReportsToUncheckedUpdateManyWithoutJob_profileInput)
  data!: JobProfileReportsToUncheckedUpdateManyWithoutJob_profileInput;
}
