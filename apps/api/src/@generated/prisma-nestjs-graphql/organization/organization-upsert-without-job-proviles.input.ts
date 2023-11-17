import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateWithoutJob_provilesInput } from './organization-update-without-job-proviles.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutJob_provilesInput } from './organization-create-without-job-proviles.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutJob_provilesInput {
  @Field(() => OrganizationUpdateWithoutJob_provilesInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJob_provilesInput)
  update!: OrganizationUpdateWithoutJob_provilesInput;

  @Field(() => OrganizationCreateWithoutJob_provilesInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutJob_provilesInput)
  create!: OrganizationCreateWithoutJob_provilesInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
