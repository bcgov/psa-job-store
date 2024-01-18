import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJob_familyInput } from './job-profile-stream-create-without-job-family.input';

@InputType()
export class JobProfileStreamCreateOrConnectWithoutJob_familyInput {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamCreateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJob_familyInput)
  create!: JobProfileStreamCreateWithoutJob_familyInput;
}
