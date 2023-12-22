import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutPosition_requestInput } from './job-profile-create-without-position-request.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutPosition_requestInput } from './job-profile-create-or-connect-without-position-request.input';
import { JobProfileUpsertWithoutPosition_requestInput } from './job-profile-upsert-without-position-request.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutPosition_requestInput } from './job-profile-update-to-one-with-where-without-position-request.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutPosition_requestNestedInput {
  @Field(() => JobProfileCreateWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutPosition_requestInput)
  create?: JobProfileCreateWithoutPosition_requestInput;

  @Field(() => JobProfileCreateOrConnectWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutPosition_requestInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutPosition_requestInput;

  @Field(() => JobProfileUpsertWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutPosition_requestInput)
  upsert?: JobProfileUpsertWithoutPosition_requestInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutPosition_requestInput)
  update?: JobProfileUpdateToOneWithWhereWithoutPosition_requestInput;
}
