import { Field, InputType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationRelationFilter {
  @Field(() => LocationWhereInput, { nullable: true })
  is?: LocationWhereInput;

  @Field(() => LocationWhereInput, { nullable: true })
  isNot?: LocationWhereInput;
}
