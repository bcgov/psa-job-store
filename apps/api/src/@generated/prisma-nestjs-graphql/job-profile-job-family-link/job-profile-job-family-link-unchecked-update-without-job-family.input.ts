import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateWithoutJobFamilyInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
