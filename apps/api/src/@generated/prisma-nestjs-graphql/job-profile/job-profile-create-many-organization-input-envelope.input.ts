import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyOrganizationInput } from './job-profile-create-many-organization.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyOrganizationInputEnvelope {
  @Field(() => [JobProfileCreateManyOrganizationInput], { nullable: false })
  @Type(() => JobProfileCreateManyOrganizationInput)
  data!: Array<JobProfileCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
