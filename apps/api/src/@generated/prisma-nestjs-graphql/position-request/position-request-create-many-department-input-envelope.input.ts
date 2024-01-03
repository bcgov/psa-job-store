import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateManyDepartmentInput } from './position-request-create-many-department.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionRequestCreateManyDepartmentInputEnvelope {
  @Field(() => [PositionRequestCreateManyDepartmentInput], { nullable: false })
  @Type(() => PositionRequestCreateManyDepartmentInput)
  data!: Array<PositionRequestCreateManyDepartmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
