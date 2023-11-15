import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateManyOrganizationInput } from './position-create-many-organization.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionCreateManyOrganizationInputEnvelope {
  @Field(() => [PositionCreateManyOrganizationInput], { nullable: false })
  @Type(() => PositionCreateManyOrganizationInput)
  data!: Array<PositionCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
