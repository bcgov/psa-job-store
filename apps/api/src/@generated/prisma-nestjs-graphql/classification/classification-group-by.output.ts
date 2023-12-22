import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ClassificationCountAggregate } from './classification-count-aggregate.output';
import { ClassificationMinAggregate } from './classification-min-aggregate.output';
import { ClassificationMaxAggregate } from './classification-max-aggregate.output';

@ObjectType()
export class ClassificationGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationCountAggregate, { nullable: true })
  _count?: ClassificationCountAggregate;

  @Field(() => ClassificationMinAggregate, { nullable: true })
  _min?: ClassificationMinAggregate;

  @Field(() => ClassificationMaxAggregate, { nullable: true })
  _max?: ClassificationMaxAggregate;
}
