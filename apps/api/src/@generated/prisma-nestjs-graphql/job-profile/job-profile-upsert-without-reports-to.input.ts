import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateWithoutReports_toInput } from './job-profile-update-without-reports-to.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutReports_toInput } from './job-profile-create-without-reports-to.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutReports_toInput {
  @Field(() => JobProfileUpdateWithoutReports_toInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutReports_toInput)
  update!: JobProfileUpdateWithoutReports_toInput;

  @Field(() => JobProfileCreateWithoutReports_toInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutReports_toInput)
  create!: JobProfileCreateWithoutReports_toInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
