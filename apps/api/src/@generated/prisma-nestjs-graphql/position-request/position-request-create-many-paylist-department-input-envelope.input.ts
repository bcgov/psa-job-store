import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyPaylist_departmentInput } from './position-request-create-many-paylist-department.input';

@InputType()
export class PositionRequestCreateManyPaylist_departmentInputEnvelope {
  @Field(() => [PositionRequestCreateManyPaylist_departmentInput], { nullable: false })
  @Type(() => PositionRequestCreateManyPaylist_departmentInput)
  data!: Array<PositionRequestCreateManyPaylist_departmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
