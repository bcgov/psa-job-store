import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutPositionsInput } from './classification-update-without-positions.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutPositionsInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutPositionsInput)
  data!: ClassificationUpdateWithoutPositionsInput;
}
