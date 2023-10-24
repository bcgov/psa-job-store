import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MinistryCreateInput } from './ministry-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneMinistryArgs {
  @Field(() => MinistryCreateInput, { nullable: false })
  @Type(() => MinistryCreateInput)
  data!: MinistryCreateInput;
}
