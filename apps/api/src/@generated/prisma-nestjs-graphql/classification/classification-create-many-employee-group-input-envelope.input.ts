import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationCreateManyEmployee_groupInput } from './classification-create-many-employee-group.input';

@InputType()
export class ClassificationCreateManyEmployee_groupInputEnvelope {
  @Field(() => [ClassificationCreateManyEmployee_groupInput], { nullable: false })
  @Type(() => ClassificationCreateManyEmployee_groupInput)
  data!: Array<ClassificationCreateManyEmployee_groupInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
