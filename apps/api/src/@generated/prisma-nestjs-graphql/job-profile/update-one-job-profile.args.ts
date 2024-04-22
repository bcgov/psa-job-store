import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileUpdateInput } from './job-profile-update.input';
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
