import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';
import { Type } from 'class-transformer';
import { JobFamilyCreateInput } from './job-family-create.input';
import { JobFamilyUpdateInput } from './job-family-update.input';

@ArgsType()
export class UpsertOneJobFamilyArgs {
  @Field(() => JobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobFamilyCreateInput, { nullable: false })
  @Type(() => JobFamilyCreateInput)
  create!: JobFamilyCreateInput;

  @Field(() => JobFamilyUpdateInput, { nullable: false })
  @Type(() => JobFamilyUpdateInput)
  update!: JobFamilyUpdateInput;
}
