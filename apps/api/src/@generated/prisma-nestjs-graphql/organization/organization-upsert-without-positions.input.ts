import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateWithoutPositionsInput } from './organization-update-without-positions.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutPositionsInput } from './organization-create-without-positions.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutPositionsInput {
  @Field(() => OrganizationUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutPositionsInput)
  update!: OrganizationUpdateWithoutPositionsInput;

  @Field(() => OrganizationCreateWithoutPositionsInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutPositionsInput)
  create!: OrganizationCreateWithoutPositionsInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
