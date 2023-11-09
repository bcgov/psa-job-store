import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutReports_toInput } from './job-profile-create-without-reports-to.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutReports_toInput } from './job-profile-create-or-connect-without-reports-to.input';
import { JobProfileUpsertWithoutReports_toInput } from './job-profile-upsert-without-reports-to.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutReports_toInput } from './job-profile-update-to-one-with-where-without-reports-to.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutReports_toNestedInput {
  @Field(() => JobProfileCreateWithoutReports_toInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutReports_toInput)
  create?: JobProfileCreateWithoutReports_toInput;

  @Field(() => JobProfileCreateOrConnectWithoutReports_toInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutReports_toInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutReports_toInput;

  @Field(() => JobProfileUpsertWithoutReports_toInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutReports_toInput)
  upsert?: JobProfileUpsertWithoutReports_toInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutReports_toInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutReports_toInput)
  update?: JobProfileUpdateToOneWithWhereWithoutReports_toInput;
}
