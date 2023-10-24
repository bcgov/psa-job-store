import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OccupationGroupWhereUniqueInput } from './occupation-group-where-unique.input';
import { Type } from 'class-transformer';
import { OccupationGroupCreateWithoutClassificationsInput } from './occupation-group-create-without-classifications.input';

@InputType()
export class OccupationGroupCreateOrConnectWithoutClassificationsInput {
  @Field(() => OccupationGroupWhereUniqueInput, { nullable: false })
  @Type(() => OccupationGroupWhereUniqueInput)
  where!: Prisma.AtLeast<OccupationGroupWhereUniqueInput, 'id'>;

  @Field(() => OccupationGroupCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => OccupationGroupCreateWithoutClassificationsInput)
  create!: OccupationGroupCreateWithoutClassificationsInput;
}
