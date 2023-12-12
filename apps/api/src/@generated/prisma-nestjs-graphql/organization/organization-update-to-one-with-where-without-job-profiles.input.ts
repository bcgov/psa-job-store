import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutJob_profilesInput } from './organization-update-without-job-profiles.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJob_profilesInput)
  data!: OrganizationUpdateWithoutJob_profilesInput;
}
