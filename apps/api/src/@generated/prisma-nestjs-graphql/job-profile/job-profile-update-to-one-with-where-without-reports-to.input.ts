import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutReports_toInput } from './job-profile-update-without-reports-to.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutReports_toInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutReports_toInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutReports_toInput)
  data!: JobProfileUpdateWithoutReports_toInput;
}
