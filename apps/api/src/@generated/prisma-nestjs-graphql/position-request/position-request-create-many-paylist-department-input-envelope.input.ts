import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateManyPaylist_departmentInput } from './position-request-create-many-paylist-department.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionRequestCreateManyPaylist_departmentInputEnvelope {
  @Field(() => [PositionRequestCreateManyPaylist_departmentInput], { nullable: false })
  @Type(() => PositionRequestCreateManyPaylist_departmentInput)
  data!: Array<PositionRequestCreateManyPaylist_departmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
