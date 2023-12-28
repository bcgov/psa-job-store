import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateWithoutJob_profilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateOrConnectWithoutJob_profilesInput } from './job-profile-stream-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamCreateNestedOneWithoutJob_profilesInput {
  @Field(() => JobProfileStreamCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateWithoutJob_profilesInput)
  create?: JobProfileStreamCreateWithoutJob_profilesInput;

  @Field(() => JobProfileStreamCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileStreamCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;
}
