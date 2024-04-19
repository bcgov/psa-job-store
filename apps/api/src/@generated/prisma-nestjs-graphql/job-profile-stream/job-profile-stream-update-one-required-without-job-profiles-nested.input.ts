import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateOrConnectWithoutJobProfilesInput } from './job-profile-stream-create-or-connect-without-job-profiles.input';
import { JobProfileStreamCreateWithoutJobProfilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { JobProfileStreamUpdateToOneWithWhereWithoutJobProfilesInput } from './job-profile-stream-update-to-one-with-where-without-job-profiles.input';
import { JobProfileStreamUpsertWithoutJobProfilesInput } from './job-profile-stream-upsert-without-job-profiles.input';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput {
  @Field(() => JobProfileStreamCreateWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateWithoutJobProfilesInput)
  create?: JobProfileStreamCreateWithoutJobProfilesInput;

  @Field(() => JobProfileStreamCreateOrConnectWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileStreamCreateOrConnectWithoutJobProfilesInput)
  connectOrCreate?: JobProfileStreamCreateOrConnectWithoutJobProfilesInput;

  @Field(() => JobProfileStreamUpsertWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileStreamUpsertWithoutJobProfilesInput)
  upsert?: JobProfileStreamUpsertWithoutJobProfilesInput;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamUpdateToOneWithWhereWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileStreamUpdateToOneWithWhereWithoutJobProfilesInput)
  update?: JobProfileStreamUpdateToOneWithWhereWithoutJobProfilesInput;
}
