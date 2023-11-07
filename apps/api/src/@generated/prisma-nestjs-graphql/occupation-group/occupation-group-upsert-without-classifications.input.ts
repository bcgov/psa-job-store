import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OccupationGroupUpdateWithoutClassificationsInput } from './occupation-group-update-without-classifications.input';
import { Type } from 'class-transformer';
import { OccupationGroupCreateWithoutClassificationsInput } from './occupation-group-create-without-classifications.input';
import { OccupationGroupWhereInput } from './occupation-group-where.input';

@InputType()
export class OccupationGroupUpsertWithoutClassificationsInput {
  @Field(() => OccupationGroupUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => OccupationGroupUpdateWithoutClassificationsInput)
  update!: OccupationGroupUpdateWithoutClassificationsInput;

  @Field(() => OccupationGroupCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => OccupationGroupCreateWithoutClassificationsInput)
  create!: OccupationGroupCreateWithoutClassificationsInput;

  @Field(() => OccupationGroupWhereInput, { nullable: true })
  @Type(() => OccupationGroupWhereInput)
  where?: OccupationGroupWhereInput;
}
