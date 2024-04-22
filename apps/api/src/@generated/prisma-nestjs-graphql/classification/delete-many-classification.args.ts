import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationWhereInput } from './classification-where.input';

@ArgsType()
export class DeleteManyClassificationArgs {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
