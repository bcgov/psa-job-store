import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileUpdateInput } from './job-profile-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileArgs {
  @Field(() => JobProfileUpdateInput, { nullable: false })
  @Type(() => JobProfileUpdateInput)
  data!: JobProfileUpdateInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
