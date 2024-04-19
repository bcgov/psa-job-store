import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationCreateManyJob_profileInput {
  @Field(() => String, { nullable: false })
  organization_id!: string;
}
