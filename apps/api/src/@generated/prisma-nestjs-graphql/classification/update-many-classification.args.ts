import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationUncheckedUpdateManyInput } from './classification-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { ClassificationWhereInput } from './classification-where.input';

@ArgsType()
export class UpdateManyClassificationArgs {
  @Field(() => ClassificationUncheckedUpdateManyInput, { nullable: false })
  @Type(() => ClassificationUncheckedUpdateManyInput)
  data!: ClassificationUncheckedUpdateManyInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
