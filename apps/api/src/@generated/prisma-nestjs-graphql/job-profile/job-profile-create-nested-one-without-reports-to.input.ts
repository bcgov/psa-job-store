import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutReports_toInput } from './job-profile-create-or-connect-without-reports-to.input';
import { JobProfileCreateWithoutReports_toInput } from './job-profile-create-without-reports-to.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutReports_toInput {
  @Field(() => JobProfileCreateWithoutReports_toInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutReports_toInput)
  create?: JobProfileCreateWithoutReports_toInput;

  @Field(() => JobProfileCreateOrConnectWithoutReports_toInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutReports_toInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutReports_toInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
