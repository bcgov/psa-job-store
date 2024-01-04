import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LocationCreateManyInput } from './location-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyLocationArgs {
  @Field(() => [LocationCreateManyInput], { nullable: false })
  @Type(() => LocationCreateManyInput)
  data!: Array<LocationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
