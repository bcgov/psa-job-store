import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobFamilyWhereInput } from './job-family-where.input';

@InputType()
export class JobFamilyRelationFilter {
  @Field(() => JobFamilyWhereInput, { nullable: true })
  is?: JobFamilyWhereInput;

  @Field(() => JobFamilyWhereInput, { nullable: true })
  isNot?: JobFamilyWhereInput;
}
