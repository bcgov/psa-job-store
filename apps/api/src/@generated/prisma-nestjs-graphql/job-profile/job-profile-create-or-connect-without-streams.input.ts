import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutStreamsInput } from './job-profile-create-without-streams.input';

@InputType()
export class JobProfileCreateOrConnectWithoutStreamsInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutStreamsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutStreamsInput)
  create!: JobProfileCreateWithoutStreamsInput;
}
