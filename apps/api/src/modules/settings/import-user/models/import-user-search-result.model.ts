import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImportUserSearchResult {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => [String], { nullable: false })
  source!: string[];
}
