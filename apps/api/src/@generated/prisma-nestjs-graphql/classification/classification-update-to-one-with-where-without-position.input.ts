import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutPositionInput } from './classification-update-without-position.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutPositionInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutPositionInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutPositionInput)
  data!: ClassificationUpdateWithoutPositionInput;
}
