import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyInput } from './position-request-create-many.input';

@ArgsType()
export class CreateManyPositionRequestArgs {
  @Field(() => [PositionRequestCreateManyInput], { nullable: false })
  @Type(() => PositionRequestCreateManyInput)
  data!: Array<PositionRequestCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
