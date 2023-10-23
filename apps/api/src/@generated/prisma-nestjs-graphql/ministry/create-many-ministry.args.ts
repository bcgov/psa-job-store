import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MinistryCreateManyInput } from './ministry-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyMinistryArgs {
  @Field(() => [MinistryCreateManyInput], { nullable: false })
  @Type(() => MinistryCreateManyInput)
  data!: Array<MinistryCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
