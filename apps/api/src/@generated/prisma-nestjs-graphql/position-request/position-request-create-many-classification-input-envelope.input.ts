import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateManyClassificationInput } from './position-request-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionRequestCreateManyClassificationInputEnvelope {
  @Field(() => [PositionRequestCreateManyClassificationInput], { nullable: false })
  @Type(() => PositionRequestCreateManyClassificationInput)
  data!: Array<PositionRequestCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
