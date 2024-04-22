import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedUpdateWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  classification_id?: string;
}
