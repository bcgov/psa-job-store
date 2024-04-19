import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@ArgsType()
export class FindUniqueJobProfileJobFamilyOrThrowArgs {
  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;
}
