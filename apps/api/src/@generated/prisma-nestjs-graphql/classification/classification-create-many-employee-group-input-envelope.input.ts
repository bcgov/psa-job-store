import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateManyEmployee_groupInput } from './classification-create-many-employee-group.input';
import { Type } from 'class-transformer';

@InputType()
export class ClassificationCreateManyEmployee_groupInputEnvelope {
  @Field(() => [ClassificationCreateManyEmployee_groupInput], { nullable: false })
  @Type(() => ClassificationCreateManyEmployee_groupInput)
  data!: Array<ClassificationCreateManyEmployee_groupInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
