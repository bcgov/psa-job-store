import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupCreateManyInput } from './occupation-group-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyOccupationGroupArgs {
  @Field(() => [OccupationGroupCreateManyInput], { nullable: false })
  @Type(() => OccupationGroupCreateManyInput)
  data!: Array<OccupationGroupCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
