import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupUpdateManyMutationInput } from './occupation-group-update-many-mutation.input';
import { Type } from 'class-transformer';
import { OccupationGroupWhereInput } from './occupation-group-where.input';

@ArgsType()
export class UpdateManyOccupationGroupArgs {
  @Field(() => OccupationGroupUpdateManyMutationInput, { nullable: false })
  @Type(() => OccupationGroupUpdateManyMutationInput)
  data!: OccupationGroupUpdateManyMutationInput;

  @Field(() => OccupationGroupWhereInput, { nullable: true })
  @Type(() => OccupationGroupWhereInput)
  where?: OccupationGroupWhereInput;
}
