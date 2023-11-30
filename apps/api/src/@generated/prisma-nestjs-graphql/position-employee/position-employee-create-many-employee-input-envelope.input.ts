import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeCreateManyEmployeeInput } from './position-employee-create-many-employee.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionEmployeeCreateManyEmployeeInputEnvelope {
  @Field(() => [PositionEmployeeCreateManyEmployeeInput], { nullable: false })
  @Type(() => PositionEmployeeCreateManyEmployeeInput)
  data!: Array<PositionEmployeeCreateManyEmployeeInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
