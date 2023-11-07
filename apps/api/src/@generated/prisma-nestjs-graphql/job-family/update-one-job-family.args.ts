import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyUpdateInput } from './job-family-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';

@ArgsType()
export class UpdateOneJobFamilyArgs {
  @Field(() => JobFamilyUpdateInput, { nullable: false })
  @Type(() => JobFamilyUpdateInput)
  data!: JobFamilyUpdateInput;

  @Field(() => JobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;
}
