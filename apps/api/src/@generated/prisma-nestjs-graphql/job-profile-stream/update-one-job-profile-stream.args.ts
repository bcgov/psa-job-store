import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamUpdateInput } from './job-profile-stream-update.input';
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
