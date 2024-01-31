import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedCreateWithoutJobFamilyInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;
}
