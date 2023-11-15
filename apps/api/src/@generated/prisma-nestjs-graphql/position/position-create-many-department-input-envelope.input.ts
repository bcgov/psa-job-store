import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateManyDepartmentInput } from './position-create-many-department.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionCreateManyDepartmentInputEnvelope {
  @Field(() => [PositionCreateManyDepartmentInput], { nullable: false })
  @Type(() => PositionCreateManyDepartmentInput)
  data!: Array<PositionCreateManyDepartmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
