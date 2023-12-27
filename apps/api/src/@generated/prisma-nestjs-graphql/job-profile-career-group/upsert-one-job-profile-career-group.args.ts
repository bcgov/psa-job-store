import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupCreateInput } from './job-profile-career-group-create.input';
import { JobProfileCareerGroupUpdateInput } from './job-profile-career-group-update.input';

@ArgsType()
export class UpsertOneJobProfileCareerGroupArgs {
  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileCareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCareerGroupCreateInput, { nullable: false })
  @Type(() => JobProfileCareerGroupCreateInput)
  create!: JobProfileCareerGroupCreateInput;

  @Field(() => JobProfileCareerGroupUpdateInput, { nullable: false })
  @Type(() => JobProfileCareerGroupUpdateInput)
  update!: JobProfileCareerGroupUpdateInput;
}
