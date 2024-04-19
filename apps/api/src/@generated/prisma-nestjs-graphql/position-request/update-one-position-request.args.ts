import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestUpdateInput } from './position-request-update.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@ArgsType()
export class UpdateOnePositionRequestArgs {
  @Field(() => PositionRequestUpdateInput, { nullable: false })
  @Type(() => PositionRequestUpdateInput)
  data!: PositionRequestUpdateInput;

  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;
}
