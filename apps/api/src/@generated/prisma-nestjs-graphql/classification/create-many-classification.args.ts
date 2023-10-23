import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationCreateManyInput } from './classification-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyClassificationArgs {
  @Field(() => [ClassificationCreateManyInput], { nullable: false })
  @Type(() => ClassificationCreateManyInput)
  data!: Array<ClassificationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
