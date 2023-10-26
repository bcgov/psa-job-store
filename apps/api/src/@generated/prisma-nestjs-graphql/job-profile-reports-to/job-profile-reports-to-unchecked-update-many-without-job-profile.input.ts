import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedUpdateManyWithoutJob_profileInput {
  @Field(() => Int, { nullable: true })
  classification_id?: number;
}
