import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  jobFamilyId?: number;
}
