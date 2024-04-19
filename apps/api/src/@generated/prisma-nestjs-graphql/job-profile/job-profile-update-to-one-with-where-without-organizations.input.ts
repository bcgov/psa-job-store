import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutOrganizationsInput } from './job-profile-update-without-organizations.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutOrganizationsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutOrganizationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOrganizationsInput)
  data!: JobProfileUpdateWithoutOrganizationsInput;
}
