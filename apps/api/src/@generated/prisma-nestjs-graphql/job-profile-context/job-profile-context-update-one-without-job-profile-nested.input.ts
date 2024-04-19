import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextCreateOrConnectWithoutJob_profileInput } from './job-profile-context-create-or-connect-without-job-profile.input';
import { JobProfileContextCreateWithoutJob_profileInput } from './job-profile-context-create-without-job-profile.input';
import { JobProfileContextUpdateToOneWithWhereWithoutJob_profileInput } from './job-profile-context-update-to-one-with-where-without-job-profile.input';
import { JobProfileContextUpsertWithoutJob_profileInput } from './job-profile-context-upsert-without-job-profile.input';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@InputType()
export class JobProfileContextUpdateOneWithoutJob_profileNestedInput {
  @Field(() => JobProfileContextCreateWithoutJob_profileInput, { nullable: true })
  @Type(() => JobProfileContextCreateWithoutJob_profileInput)
  create?: JobProfileContextCreateWithoutJob_profileInput;

  @Field(() => JobProfileContextCreateOrConnectWithoutJob_profileInput, { nullable: true })
  @Type(() => JobProfileContextCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: JobProfileContextCreateOrConnectWithoutJob_profileInput;

  @Field(() => JobProfileContextUpsertWithoutJob_profileInput, { nullable: true })
  @Type(() => JobProfileContextUpsertWithoutJob_profileInput)
  upsert?: JobProfileContextUpsertWithoutJob_profileInput;

  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  disconnect?: JobProfileContextWhereInput;

  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  delete?: JobProfileContextWhereInput;

  @Field(() => JobProfileContextWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileContextWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;

  @Field(() => JobProfileContextUpdateToOneWithWhereWithoutJob_profileInput, { nullable: true })
  @Type(() => JobProfileContextUpdateToOneWithWhereWithoutJob_profileInput)
  update?: JobProfileContextUpdateToOneWithWhereWithoutJob_profileInput;
}
