import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyLinkCountAggregate {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
