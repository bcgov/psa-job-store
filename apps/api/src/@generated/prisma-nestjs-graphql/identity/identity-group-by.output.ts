import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { IdentityCountAggregate } from './identity-count-aggregate.output';
import { IdentityMinAggregate } from './identity-min-aggregate.output';
import { IdentityMaxAggregate } from './identity-max-aggregate.output';

@ObjectType()
export class IdentityGroupBy {
  @Field(() => String, { nullable: false })
  sub!: string;

  @Field(() => String, { nullable: false })
  identity_provider!: string;

  @Field(() => String, { nullable: false })
  user_id!: string;

  @Field(() => Date, { nullable: false })
  created_at!: Date | string;

  @Field(() => Date, { nullable: false })
  updated_at!: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => IdentityCountAggregate, { nullable: true })
  _count?: IdentityCountAggregate;

  @Field(() => IdentityMinAggregate, { nullable: true })
  _min?: IdentityMinAggregate;

  @Field(() => IdentityMaxAggregate, { nullable: true })
  _max?: IdentityMaxAggregate;
}
