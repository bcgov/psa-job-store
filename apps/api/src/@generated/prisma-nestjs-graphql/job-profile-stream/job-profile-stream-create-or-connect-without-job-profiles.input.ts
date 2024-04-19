import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJobProfilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamCreateOrConnectWithoutJobProfilesInput {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamCreateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJobProfilesInput)
  create!: JobProfileStreamCreateWithoutJobProfilesInput;
}
