import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { IdentityCountAggregate } from './identity-count-aggregate.output';
import { IdentityMinAggregate } from './identity-min-aggregate.output';
import { IdentityMaxAggregate } from './identity-max-aggregate.output';

@ObjectType()
export class AggregateIdentity {
  @Field(() => IdentityCountAggregate, { nullable: true })
  _count?: IdentityCountAggregate;

  @Field(() => IdentityMinAggregate, { nullable: true })
  _min?: IdentityMinAggregate;

  @Field(() => IdentityMaxAggregate, { nullable: true })
  _max?: IdentityMaxAggregate;
}
