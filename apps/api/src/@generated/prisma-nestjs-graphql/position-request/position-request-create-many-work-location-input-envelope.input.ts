import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateManyWorkLocationInput } from './position-request-create-many-work-location.input';
import { Type } from 'class-transformer';

@InputType()
export class PositionRequestCreateManyWorkLocationInputEnvelope {
  @Field(() => [PositionRequestCreateManyWorkLocationInput], { nullable: false })
  @Type(() => PositionRequestCreateManyWorkLocationInput)
  data!: Array<PositionRequestCreateManyWorkLocationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
