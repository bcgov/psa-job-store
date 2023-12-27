import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutStreamInput } from './job-profile-create-without-stream.input';

@InputType()
export class JobProfileCreateOrConnectWithoutStreamInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutStreamInput)
  create!: JobProfileCreateWithoutStreamInput;
}
