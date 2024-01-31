import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileContextCreateWithoutJob_profileInput } from './job-profile-context-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileContextCreateOrConnectWithoutJob_profileInput } from './job-profile-context-create-or-connect-without-job-profile.input';
import { Prisma } from '@prisma/client';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';

@InputType()
export class JobProfileContextUncheckedCreateNestedOneWithoutJob_profileInput {
  @Field(() => JobProfileContextCreateWithoutJob_profileInput, { nullable: true })
  @Type(() => JobProfileContextCreateWithoutJob_profileInput)
  create?: JobProfileContextCreateWithoutJob_profileInput;

  @Field(() => JobProfileContextCreateOrConnectWithoutJob_profileInput, { nullable: true })
  @Type(() => JobProfileContextCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: JobProfileContextCreateOrConnectWithoutJob_profileInput;

  @Field(() => JobProfileContextWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileContextWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;
}
