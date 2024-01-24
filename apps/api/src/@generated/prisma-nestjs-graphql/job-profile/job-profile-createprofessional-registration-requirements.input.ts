import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCreateprofessional_registration_requirementsInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
