import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationUpdateManyMutationInput } from './classification-update-many-mutation.input';
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
