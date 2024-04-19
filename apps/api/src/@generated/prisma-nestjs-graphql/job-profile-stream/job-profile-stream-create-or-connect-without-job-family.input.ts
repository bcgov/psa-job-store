import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJob_familyInput } from './job-profile-stream-create-without-job-family.input';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamCreateOrConnectWithoutJob_familyInput {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamCreateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJob_familyInput)
  create!: JobProfileStreamCreateWithoutJob_familyInput;
}
