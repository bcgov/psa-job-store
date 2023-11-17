import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationUpdateManyMutationInput } from './classification-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ClassificationWhereInput } from './classification-where.input';

@ArgsType()
export class UpdateManyClassificationArgs {
  @Field(() => ClassificationUpdateManyMutationInput, { nullable: false })
  @Type(() => ClassificationUpdateManyMutationInput)
  data!: ClassificationUpdateManyMutationInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
