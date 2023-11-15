import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutPositionInput } from './organization-update-without-position.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutPositionInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutPositionInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutPositionInput)
  data!: OrganizationUpdateWithoutPositionInput;
}
