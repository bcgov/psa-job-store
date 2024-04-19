import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateManyInput } from './job-profile-organization-create-many.input';

@ArgsType()
export class CreateManyJobProfileOrganizationArgs {
  @Field(() => [JobProfileOrganizationCreateManyInput], { nullable: false })
  @Type(() => JobProfileOrganizationCreateManyInput)
  data!: Array<JobProfileOrganizationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
