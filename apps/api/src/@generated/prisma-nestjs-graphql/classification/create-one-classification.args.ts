import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationCreateInput } from './classification-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneClassificationArgs {
  @Field(() => ClassificationCreateInput, { nullable: false })
  @Type(() => ClassificationCreateInput)
  data!: ClassificationCreateInput;
}
