import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateInput } from './job-profile-scope-create.input';
import { JobProfileScopeUpdateInput } from './job-profile-scope-update.input';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileScopeArgs {
  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileScopeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;

  @Field(() => JobProfileScopeCreateInput, { nullable: false })
  @Type(() => JobProfileScopeCreateInput)
  create!: JobProfileScopeCreateInput;

  @Field(() => JobProfileScopeUpdateInput, { nullable: false })
  @Type(() => JobProfileScopeUpdateInput)
  update!: JobProfileScopeUpdateInput;
}
