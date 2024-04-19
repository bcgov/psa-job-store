import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedUpdateManyWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  classification_id?: string;
}
