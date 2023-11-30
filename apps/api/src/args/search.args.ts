import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchArgs {
  @Field(() => String, { nullable: true })
  search?: string;
}
