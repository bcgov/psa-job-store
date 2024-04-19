import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationCreateInput } from './classification-create.input';

@ArgsType()
export class CreateOneClassificationArgs {
  @Field(() => ClassificationCreateInput, { nullable: false })
  @Type(() => ClassificationCreateInput)
  data!: ClassificationCreateInput;
}
