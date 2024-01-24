import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestCreateManyInput } from './position-request-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyPositionRequestArgs {
  @Field(() => [PositionRequestCreateManyInput], { nullable: false })
  @Type(() => PositionRequestCreateManyInput)
  data!: Array<PositionRequestCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
