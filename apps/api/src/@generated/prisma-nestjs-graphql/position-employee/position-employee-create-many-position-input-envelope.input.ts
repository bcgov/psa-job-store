import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeCreateManyPositionInput } from './position-employee-create-many-position.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionEmployeeCreateManyPositionInputEnvelope {
  @Field(() => [PositionEmployeeCreateManyPositionInput], { nullable: false })
  @Type(() => PositionEmployeeCreateManyPositionInput)
  data!: Array<PositionEmployeeCreateManyPositionInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
