import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyClassificationArgs {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
