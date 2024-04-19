import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyUpdateInput } from './job-profile-job-family-update.input';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileJobFamilyArgs {
  @Field(() => JobProfileJobFamilyUpdateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateInput)
  data!: JobProfileJobFamilyUpdateInput;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;
}
