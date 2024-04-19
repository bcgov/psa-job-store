import { Field, InputType } from '@nestjs/graphql';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@InputType()
export class JobProfileScopeRelationFilter {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  is?: JobProfileScopeWhereInput;

  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  isNot?: JobProfileScopeWhereInput;
}
