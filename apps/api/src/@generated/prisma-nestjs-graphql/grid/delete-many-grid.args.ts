import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridWhereInput } from './grid-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyGridArgs {
  @Field(() => GridWhereInput, { nullable: true })
  @Type(() => GridWhereInput)
  where?: GridWhereInput;
}
