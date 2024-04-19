import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationUpdateManyMutationInput } from './location-update-many-mutation.input';
import { LocationWhereInput } from './location-where.input';

@ArgsType()
export class UpdateManyLocationArgs {
  @Field(() => LocationUpdateManyMutationInput, { nullable: false })
  @Type(() => LocationUpdateManyMutationInput)
  data!: LocationUpdateManyMutationInput;

  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;
}
