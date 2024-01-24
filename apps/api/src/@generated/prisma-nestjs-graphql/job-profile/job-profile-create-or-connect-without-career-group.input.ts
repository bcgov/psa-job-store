import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutCareer_groupInput } from './job-profile-create-without-career-group.input';

@InputType()
export class JobProfileCreateOrConnectWithoutCareer_groupInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutCareer_groupInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutCareer_groupInput)
  create!: JobProfileCreateWithoutCareer_groupInput;
}
