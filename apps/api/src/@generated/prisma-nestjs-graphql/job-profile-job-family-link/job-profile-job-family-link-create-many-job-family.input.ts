import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobFamilyInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;
}
