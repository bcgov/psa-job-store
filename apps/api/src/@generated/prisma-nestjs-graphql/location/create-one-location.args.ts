import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationCreateInput } from './location-create.input';

@ArgsType()
export class CreateOneLocationArgs {
  @Field(() => LocationCreateInput, { nullable: false })
  @Type(() => LocationCreateInput)
  data!: LocationCreateInput;
}
