import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationUncheckedUpdateWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  organization_id?: string;
}
