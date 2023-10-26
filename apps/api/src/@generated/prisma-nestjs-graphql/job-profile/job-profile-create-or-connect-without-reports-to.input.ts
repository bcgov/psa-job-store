import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutReports_toInput } from './job-profile-create-without-reports-to.input';

@InputType()
export class JobProfileCreateOrConnectWithoutReports_toInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutReports_toInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutReports_toInput)
  create!: JobProfileCreateWithoutReports_toInput;
}
