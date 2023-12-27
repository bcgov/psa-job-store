import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileContextCreateWithoutJob_profileInput } from './job-profile-context-create-without-job-profile.input';

@InputType()
export class JobProfileContextCreateOrConnectWithoutJob_profileInput {
  @Field(() => JobProfileContextWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileContextWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;

  @Field(() => JobProfileContextCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileContextCreateWithoutJob_profileInput)
  create!: JobProfileContextCreateWithoutJob_profileInput;
}
