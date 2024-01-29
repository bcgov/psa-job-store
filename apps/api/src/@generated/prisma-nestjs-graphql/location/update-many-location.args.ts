import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LocationUpdateManyMutationInput } from './location-update-many-mutation.input';
import { Type } from 'class-transformer';
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
