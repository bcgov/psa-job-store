import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyWorkLocationInput } from './position-request-create-many-work-location.input';

@InputType()
export class PositionRequestCreateManyWorkLocationInputEnvelope {
  @Field(() => [PositionRequestCreateManyWorkLocationInput], { nullable: false })
  @Type(() => PositionRequestCreateManyWorkLocationInput)
  data!: Array<PositionRequestCreateManyWorkLocationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
