import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateWithoutPositionInput } from './organization-update-without-position.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutPositionInput } from './organization-create-without-position.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutPositionInput {
  @Field(() => OrganizationUpdateWithoutPositionInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutPositionInput)
  update!: OrganizationUpdateWithoutPositionInput;

  @Field(() => OrganizationCreateWithoutPositionInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutPositionInput)
  create!: OrganizationCreateWithoutPositionInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
