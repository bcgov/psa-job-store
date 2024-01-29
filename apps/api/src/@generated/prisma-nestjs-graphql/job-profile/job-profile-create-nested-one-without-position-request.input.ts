import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutPosition_requestInput } from './job-profile-create-without-position-request.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutPosition_requestInput } from './job-profile-create-or-connect-without-position-request.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutPosition_requestInput {
  @Field(() => JobProfileCreateWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutPosition_requestInput)
  create?: JobProfileCreateWithoutPosition_requestInput;

  @Field(() => JobProfileCreateOrConnectWithoutPosition_requestInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutPosition_requestInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutPosition_requestInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
