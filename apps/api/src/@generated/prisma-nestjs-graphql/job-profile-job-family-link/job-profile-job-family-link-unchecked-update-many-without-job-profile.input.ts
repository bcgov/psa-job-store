import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileInput {
  @Field(() => Int, { nullable: true })
  jobFamilyId?: number;
}
