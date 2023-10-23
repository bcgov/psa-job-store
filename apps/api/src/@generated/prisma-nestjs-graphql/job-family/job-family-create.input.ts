import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobFamilyCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
