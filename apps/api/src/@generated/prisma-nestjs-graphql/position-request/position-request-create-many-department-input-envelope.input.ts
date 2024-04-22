import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyDepartmentInput } from './position-request-create-many-department.input';

@InputType()
export class PositionRequestCreateManyDepartmentInputEnvelope {
  @Field(() => [PositionRequestCreateManyDepartmentInput], { nullable: false })
  @Type(() => PositionRequestCreateManyDepartmentInput)
  data!: Array<PositionRequestCreateManyDepartmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
