import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutJob_familyInput } from './job-profile-update-without-job-family.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutJob_familyInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutJob_familyInput)
  data!: JobProfileUpdateWithoutJob_familyInput;
}
