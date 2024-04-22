import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutOrganizationsInput } from './job-profile-create-without-organizations.input';
import { JobProfileUpdateWithoutOrganizationsInput } from './job-profile-update-without-organizations.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutOrganizationsInput {
  @Field(() => JobProfileUpdateWithoutOrganizationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOrganizationsInput)
  update!: JobProfileUpdateWithoutOrganizationsInput;

  @Field(() => JobProfileCreateWithoutOrganizationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOrganizationsInput)
  create!: JobProfileCreateWithoutOrganizationsInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
