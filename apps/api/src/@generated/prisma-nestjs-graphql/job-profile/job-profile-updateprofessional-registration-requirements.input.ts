import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileUpdateprofessional_registration_requirementsInput {
  @Field(() => [String], { nullable: true })
  set?: Array<string>;

  @Field(() => [String], { nullable: true })
  push?: Array<string>;
}
