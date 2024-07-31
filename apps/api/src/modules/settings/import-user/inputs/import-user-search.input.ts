import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ImportUserSearchInput {
  @Field(() => String, { nullable: false })
  email!: string;
}
