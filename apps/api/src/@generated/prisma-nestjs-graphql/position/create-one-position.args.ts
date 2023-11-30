import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionCreateInput } from './position-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnePositionArgs {
  @Field(() => PositionCreateInput, { nullable: false })
  @Type(() => PositionCreateInput)
  data!: PositionCreateInput;
}
