import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJobProfilesInput } from './job-profile-stream-create-without-job-profiles.input';

@InputType()
export class JobProfileStreamCreateOrConnectWithoutJobProfilesInput {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamCreateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJobProfilesInput)
  create!: JobProfileStreamCreateWithoutJobProfilesInput;
}
