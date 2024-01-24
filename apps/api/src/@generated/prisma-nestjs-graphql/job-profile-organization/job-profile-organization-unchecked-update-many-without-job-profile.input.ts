import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  organization_id?: string;
}
