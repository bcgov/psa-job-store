import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateInput } from './job-profile-create.input';
import { JobProfileUpdateInput } from './job-profile-update.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileArgs {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateInput, { nullable: false })
  @Type(() => JobProfileCreateInput)
  create!: JobProfileCreateInput;

  @Field(() => JobProfileUpdateInput, { nullable: false })
  @Type(() => JobProfileUpdateInput)
  update!: JobProfileUpdateInput;
}
