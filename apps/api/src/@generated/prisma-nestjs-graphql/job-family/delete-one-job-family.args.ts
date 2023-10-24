import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneJobFamilyArgs {
  @Field(() => JobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;
}
