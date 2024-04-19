import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedCreateWithoutJob_profileInput {
  @Field(() => String, { nullable: false })
  classification_id!: string;
}
