import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupWhereInput } from './occupation-group-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyOccupationGroupArgs {
  @Field(() => OccupationGroupWhereInput, { nullable: true })
  @Type(() => OccupationGroupWhereInput)
  where?: OccupationGroupWhereInput;
}
