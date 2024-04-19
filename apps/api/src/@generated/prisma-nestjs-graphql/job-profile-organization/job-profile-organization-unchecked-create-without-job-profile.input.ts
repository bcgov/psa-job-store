import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationUncheckedCreateWithoutJob_profileInput {
  @Field(() => String, { nullable: false })
  organization_id!: string;
}
