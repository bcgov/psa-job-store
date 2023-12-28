import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamUpdateInput } from './job-profile-stream-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileStreamArgs {
  @Field(() => JobProfileStreamUpdateInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateInput)
  data!: JobProfileStreamUpdateInput;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;
}
