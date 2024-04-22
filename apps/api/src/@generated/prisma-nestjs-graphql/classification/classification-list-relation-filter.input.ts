import { Field, InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationListRelationFilter {
  @Field(() => ClassificationWhereInput, { nullable: true })
  every?: ClassificationWhereInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  some?: ClassificationWhereInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  none?: ClassificationWhereInput;
}
