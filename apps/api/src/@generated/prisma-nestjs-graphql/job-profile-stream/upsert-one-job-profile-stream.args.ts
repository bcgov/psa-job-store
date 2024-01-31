import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateInput } from './job-profile-stream-create.input';
import { JobProfileStreamUpdateInput } from './job-profile-stream-update.input';

@ArgsType()
export class UpsertOneJobProfileStreamArgs {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => JobProfileStreamCreateInput, { nullable: false })
  @Type(() => JobProfileStreamCreateInput)
  create!: JobProfileStreamCreateInput;

  @Field(() => JobProfileStreamUpdateInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateInput)
  update!: JobProfileStreamUpdateInput;
}
