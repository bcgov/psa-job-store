import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamUpdateWithoutJob_familyInput } from './job-profile-stream-update-without-job-family.input';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamUpdateWithWhereUniqueWithoutJob_familyInput {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamUpdateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateWithoutJob_familyInput)
  data!: JobProfileStreamUpdateWithoutJob_familyInput;
}
