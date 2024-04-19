import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationCreateManyInput } from './location-create-many.input';

@ArgsType()
export class CreateManyLocationArgs {
  @Field(() => [LocationCreateManyInput], { nullable: false })
  @Type(() => LocationCreateManyInput)
  data!: Array<LocationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
