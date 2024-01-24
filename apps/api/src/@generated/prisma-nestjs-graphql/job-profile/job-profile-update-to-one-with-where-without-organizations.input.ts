import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutOrganizationsInput } from './job-profile-update-without-organizations.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutOrganizationsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutOrganizationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOrganizationsInput)
  data!: JobProfileUpdateWithoutOrganizationsInput;
}
