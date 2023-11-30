import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateManyClassificationInput } from './position-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionCreateManyClassificationInputEnvelope {
  @Field(() => [PositionCreateManyClassificationInput], { nullable: false })
  @Type(() => PositionCreateManyClassificationInput)
  data!: Array<PositionCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
