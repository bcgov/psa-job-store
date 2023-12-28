import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutContextInput } from './job-profile-create-without-context.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutContextInput } from './job-profile-create-or-connect-without-context.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutContextInput {
  @Field(() => JobProfileCreateWithoutContextInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutContextInput)
  create?: JobProfileCreateWithoutContextInput;

  @Field(() => JobProfileCreateOrConnectWithoutContextInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutContextInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutContextInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;
}
