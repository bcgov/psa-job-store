import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobFamilyUpdateWithoutProfilesInput } from './job-family-update-without-profiles.input';
import { Type } from 'class-transformer';
import { JobFamilyCreateWithoutProfilesInput } from './job-family-create-without-profiles.input';
import { JobFamilyWhereInput } from './job-family-where.input';

@InputType()
export class JobFamilyUpsertWithoutProfilesInput {
  @Field(() => JobFamilyUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => JobFamilyUpdateWithoutProfilesInput)
  update!: JobFamilyUpdateWithoutProfilesInput;

  @Field(() => JobFamilyCreateWithoutProfilesInput, { nullable: false })
  @Type(() => JobFamilyCreateWithoutProfilesInput)
  create!: JobFamilyCreateWithoutProfilesInput;

  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  where?: JobFamilyWhereInput;
}
