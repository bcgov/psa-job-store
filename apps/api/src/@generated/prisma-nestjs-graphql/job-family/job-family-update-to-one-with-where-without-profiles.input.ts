import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobFamilyWhereInput } from './job-family-where.input';
import { Type } from 'class-transformer';
import { JobFamilyUpdateWithoutProfilesInput } from './job-family-update-without-profiles.input';

@InputType()
export class JobFamilyUpdateToOneWithWhereWithoutProfilesInput {
  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  where?: JobFamilyWhereInput;

  @Field(() => JobFamilyUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => JobFamilyUpdateWithoutProfilesInput)
  data!: JobFamilyUpdateWithoutProfilesInput;
}
