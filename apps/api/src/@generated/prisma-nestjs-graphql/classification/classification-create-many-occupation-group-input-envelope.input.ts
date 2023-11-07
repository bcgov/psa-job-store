import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateManyOccupation_groupInput } from './classification-create-many-occupation-group.input';
import { Type } from 'class-transformer';

@InputType()
export class ClassificationCreateManyOccupation_groupInputEnvelope {
  @Field(() => [ClassificationCreateManyOccupation_groupInput], { nullable: false })
  @Type(() => ClassificationCreateManyOccupation_groupInput)
  data!: Array<ClassificationCreateManyOccupation_groupInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
