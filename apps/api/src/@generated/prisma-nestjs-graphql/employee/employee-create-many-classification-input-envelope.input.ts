import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateManyClassificationInput } from './employee-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class EmployeeCreateManyClassificationInputEnvelope {
  @Field(() => [EmployeeCreateManyClassificationInput], { nullable: false })
  @Type(() => EmployeeCreateManyClassificationInput)
  data!: Array<EmployeeCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
