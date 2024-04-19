import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@ArgsType()
export class DeleteOneJobProfileStreamArgs {
  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileStreamWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;
}
