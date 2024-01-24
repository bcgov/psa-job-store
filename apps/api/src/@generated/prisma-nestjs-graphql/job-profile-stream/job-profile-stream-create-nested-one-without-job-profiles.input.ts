import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateWithoutJobProfilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateOrConnectWithoutJobProfilesInput } from './job-profile-stream-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamCreateNestedOneWithoutJobProfilesInput {
  @Field(() => JobProfileStreamCreateWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateWithoutJobProfilesInput)
  create?: JobProfileStreamCreateWithoutJobProfilesInput;

  @Field(() => JobProfileStreamCreateOrConnectWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateOrConnectWithoutJobProfilesInput)
  connectOrCreate?: JobProfileStreamCreateOrConnectWithoutJobProfilesInput;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;
}
