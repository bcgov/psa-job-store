import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeCreateManyInput } from './position-employee-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyPositionEmployeeArgs {
  @Field(() => [PositionEmployeeCreateManyInput], { nullable: false })
  @Type(() => PositionEmployeeCreateManyInput)
  data!: Array<PositionEmployeeCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
