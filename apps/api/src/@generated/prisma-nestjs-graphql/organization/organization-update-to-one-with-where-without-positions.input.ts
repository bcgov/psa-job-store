import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutPositionsInput } from './organization-update-without-positions.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutPositionsInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutPositionsInput)
  data!: OrganizationUpdateWithoutPositionsInput;
}
