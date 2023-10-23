import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridCreateInput } from './grid-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneGridArgs {
  @Field(() => GridCreateInput, { nullable: false })
  @Type(() => GridCreateInput)
  data!: GridCreateInput;
}
