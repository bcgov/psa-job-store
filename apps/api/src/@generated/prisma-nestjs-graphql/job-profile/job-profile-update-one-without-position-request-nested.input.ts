import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutPosition_requestInput } from './job-profile-create-or-connect-without-position-request.input';
import { JobProfileCreateWithoutPosition_requestInput } from './job-profile-create-without-position-request.input';
import { JobProfileUpdateToOneWithWhereWithoutPosition_requestInput } from './job-profile-update-to-one-with-where-without-position-request.input';
import { JobProfileUpsertWithoutPosition_requestInput } from './job-profile-upsert-without-position-request.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateOneWithoutPosition_requestNestedInput {
  @Field(() => JobProfileCreateWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutPosition_requestInput)
  create?: JobProfileCreateWithoutPosition_requestInput;

  @Field(() => JobProfileCreateOrConnectWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutPosition_requestInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutPosition_requestInput;

  @Field(() => JobProfileUpsertWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutPosition_requestInput)
  upsert?: JobProfileUpsertWithoutPosition_requestInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  disconnect?: JobProfileWhereInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  delete?: JobProfileWhereInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutPosition_requestInput)
  update?: JobProfileUpdateToOneWithWhereWithoutPosition_requestInput;
}
