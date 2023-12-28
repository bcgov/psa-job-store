import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneJobProfileCareerGroupArgs {
  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileCareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;
}
