import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateWithoutJob_profilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateOrConnectWithoutJob_profilesInput } from './job-profile-stream-create-or-connect-without-job-profiles.input';
import { JobProfileStreamUpsertWithoutJob_profilesInput } from './job-profile-stream-upsert-without-job-profiles.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { JobProfileStreamUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-stream-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class JobProfileStreamUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => JobProfileStreamCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateWithoutJob_profilesInput)
  create?: JobProfileStreamCreateWithoutJob_profilesInput;

  @Field(() => JobProfileStreamCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileStreamCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileStreamUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileStreamUpsertWithoutJob_profilesInput)
  upsert?: JobProfileStreamUpsertWithoutJob_profilesInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  disconnect?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  delete?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileStreamUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: JobProfileStreamUpdateToOneWithWhereWithoutJob_profilesInput;
}
