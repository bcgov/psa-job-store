import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileScopeUpdateInput } from './job-profile-scope-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileScopeArgs {
  @Field(() => JobProfileScopeUpdateInput, { nullable: false })
  @Type(() => JobProfileScopeUpdateInput)
  data!: JobProfileScopeUpdateInput;

  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileScopeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;
}
