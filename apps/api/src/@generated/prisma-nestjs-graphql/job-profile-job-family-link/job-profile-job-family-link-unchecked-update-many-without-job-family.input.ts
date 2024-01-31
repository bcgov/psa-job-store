import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
