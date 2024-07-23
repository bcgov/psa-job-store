import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class ImportUserInput {
  @Field(() => GraphQLUUID, { nullable: false })
  id!: string;
}
