import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutReports_toInput } from './job-profile-update-without-reports-to.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutReports_toInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutReports_toInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutReports_toInput)
  data!: JobProfileUpdateWithoutReports_toInput;
}
