import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupCreateInput } from './occupation-group-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneOccupationGroupArgs {
  @Field(() => OccupationGroupCreateInput, { nullable: false })
  @Type(() => OccupationGroupCreateInput)
  data!: OccupationGroupCreateInput;
}
