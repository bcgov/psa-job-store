import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobProfileScopeArgs {
  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileScopeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;
}
