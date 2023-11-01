import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutCareer_groupInput } from './job-profile-update-without-career-group.input';
import { JobProfileCreateWithoutCareer_groupInput } from './job-profile-create-without-career-group.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutCareer_groupInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutCareer_groupInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutCareer_groupInput)
  update!: JobProfileUpdateWithoutCareer_groupInput;

  @Field(() => JobProfileCreateWithoutCareer_groupInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutCareer_groupInput)
  create!: JobProfileCreateWithoutCareer_groupInput;
}
