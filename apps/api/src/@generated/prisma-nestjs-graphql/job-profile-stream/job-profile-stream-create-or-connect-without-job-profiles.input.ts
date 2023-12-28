import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJob_profilesInput } from './job-profile-stream-create-without-job-profiles.input';

@InputType()
export class JobProfileStreamCreateOrConnectWithoutJob_profilesInput {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJob_profilesInput)
  create!: JobProfileStreamCreateWithoutJob_profilesInput;
}
