import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileScopeUpdateInput } from './job-profile-scope-update.input';
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
