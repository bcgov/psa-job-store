import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { JobProfileCreateInput } from '../../../@generated/prisma-nestjs-graphql/job-profile/job-profile-create.input';
import { IsValidJsonArrayStructure } from './profile-structure.validator';

@InputType()
export class ExtendedJobProfileCreateInput extends JobProfileCreateInput {
  @Field(() => GraphQLJSON, { nullable: true })
  @IsValidJsonArrayStructure()
  accountabilities?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsValidJsonArrayStructure()
  education?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsValidJsonArrayStructure()
  job_experience?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsValidJsonArrayStructure()
  professional_registration_requirements?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsValidJsonArrayStructure()
  security_screenings?: any;
}
