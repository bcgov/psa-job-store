import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateManyInput } from './job-profile-organization-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileOrganizationArgs {
  @Field(() => [JobProfileOrganizationCreateManyInput], { nullable: false })
  @Type(() => JobProfileOrganizationCreateManyInput)
  data!: Array<JobProfileOrganizationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
