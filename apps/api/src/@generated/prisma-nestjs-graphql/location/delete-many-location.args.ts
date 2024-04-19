import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationWhereInput } from './location-where.input';

@ArgsType()
export class DeleteManyLocationArgs {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;
}
