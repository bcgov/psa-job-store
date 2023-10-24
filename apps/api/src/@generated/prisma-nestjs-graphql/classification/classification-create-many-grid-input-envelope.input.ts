import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateManyGridInput } from './classification-create-many-grid.input';
import { Type } from 'class-transformer';

@InputType()
export class ClassificationCreateManyGridInputEnvelope {
  @Field(() => [ClassificationCreateManyGridInput], { nullable: false })
  @Type(() => ClassificationCreateManyGridInput)
  data!: Array<ClassificationCreateManyGridInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
