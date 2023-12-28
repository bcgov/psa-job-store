import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupUpdateInput } from './job-profile-career-group-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileCareerGroupArgs {
  @Field(() => JobProfileCareerGroupUpdateInput, { nullable: false })
  @Type(() => JobProfileCareerGroupUpdateInput)
  data!: JobProfileCareerGroupUpdateInput;

  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileCareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;
}
