import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedCreateWithoutJob_profileInput {
  @Field(() => Int, { nullable: false })
  classification_id!: number;
}
