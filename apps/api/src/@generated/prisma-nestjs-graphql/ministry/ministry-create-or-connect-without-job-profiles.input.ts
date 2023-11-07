import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { Type } from 'class-transformer';
import { MinistryCreateWithoutJob_profilesInput } from './ministry-create-without-job-profiles.input';

@InputType()
export class MinistryCreateOrConnectWithoutJob_profilesInput {
  @Field(() => MinistryWhereUniqueInput, { nullable: false })
  @Type(() => MinistryWhereUniqueInput)
  where!: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;

  @Field(() => MinistryCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => MinistryCreateWithoutJob_profilesInput)
  create!: MinistryCreateWithoutJob_profilesInput;
}
