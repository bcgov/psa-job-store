import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MinistryUpdateManyMutationInput } from './ministry-update-many-mutation.input';
import { Type } from 'class-transformer';
import { MinistryWhereInput } from './ministry-where.input';

@ArgsType()
export class UpdateManyMinistryArgs {
  @Field(() => MinistryUpdateManyMutationInput, { nullable: false })
  @Type(() => MinistryUpdateManyMutationInput)
  data!: MinistryUpdateManyMutationInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;
}
