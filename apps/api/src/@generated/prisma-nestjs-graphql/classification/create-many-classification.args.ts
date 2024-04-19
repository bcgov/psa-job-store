import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationCreateManyInput } from './classification-create-many.input';

@ArgsType()
export class CreateManyClassificationArgs {
  @Field(() => [ClassificationCreateManyInput], { nullable: false })
  @Type(() => ClassificationCreateManyInput)
  data!: Array<ClassificationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
