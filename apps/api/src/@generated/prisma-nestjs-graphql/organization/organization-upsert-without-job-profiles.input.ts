import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateWithoutJob_profilesInput } from './organization-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutJob_profilesInput } from './organization-create-without-job-profiles.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutJob_profilesInput {
  @Field(() => OrganizationUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJob_profilesInput)
  update!: OrganizationUpdateWithoutJob_profilesInput;

  @Field(() => OrganizationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutJob_profilesInput)
  create!: OrganizationCreateWithoutJob_profilesInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
