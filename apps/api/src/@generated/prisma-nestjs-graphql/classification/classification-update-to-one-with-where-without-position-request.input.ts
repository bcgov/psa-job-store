import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutPositionRequestInput } from './classification-update-without-position-request.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutPositionRequestInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutPositionRequestInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutPositionRequestInput)
  data!: ClassificationUpdateWithoutPositionRequestInput;
}
