import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutCareer_groupInput } from './job-profile-update-without-career-group.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutCareer_groupInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutCareer_groupInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutCareer_groupInput)
  data!: JobProfileUpdateWithoutCareer_groupInput;
}
