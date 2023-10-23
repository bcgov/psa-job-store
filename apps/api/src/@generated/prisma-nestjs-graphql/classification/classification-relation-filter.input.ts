import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationRelationFilter {
  @Field(() => ClassificationWhereInput, { nullable: true })
  is?: ClassificationWhereInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  isNot?: ClassificationWhereInput;
}
