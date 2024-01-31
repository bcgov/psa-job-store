import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateInput } from './job-profile-job-family-create.input';
import { JobProfileJobFamilyUpdateInput } from './job-profile-job-family-update.input';

@ArgsType()
export class UpsertOneJobProfileJobFamilyArgs {
  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyCreateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateInput)
  create!: JobProfileJobFamilyCreateInput;

  @Field(() => JobProfileJobFamilyUpdateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateInput)
  update!: JobProfileJobFamilyUpdateInput;
}
