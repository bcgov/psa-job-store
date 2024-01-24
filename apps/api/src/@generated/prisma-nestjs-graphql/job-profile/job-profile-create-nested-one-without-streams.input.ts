import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutStreamsInput } from './job-profile-create-without-streams.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutStreamsInput } from './job-profile-create-or-connect-without-streams.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutStreamsInput {
  @Field(() => JobProfileCreateWithoutStreamsInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutStreamsInput)
  create?: JobProfileCreateWithoutStreamsInput;

  @Field(() => JobProfileCreateOrConnectWithoutStreamsInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutStreamsInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutStreamsInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
