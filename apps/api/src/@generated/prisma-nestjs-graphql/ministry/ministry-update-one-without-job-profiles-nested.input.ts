import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryCreateWithoutJob_profilesInput } from './ministry-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { MinistryCreateOrConnectWithoutJob_profilesInput } from './ministry-create-or-connect-without-job-profiles.input';
import { MinistryUpsertWithoutJob_profilesInput } from './ministry-upsert-without-job-profiles.input';
import { MinistryWhereInput } from './ministry-where.input';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { MinistryUpdateToOneWithWhereWithoutJob_profilesInput } from './ministry-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class MinistryUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => MinistryCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => MinistryCreateWithoutJob_profilesInput)
  create?: MinistryCreateWithoutJob_profilesInput;

  @Field(() => MinistryCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => MinistryCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: MinistryCreateOrConnectWithoutJob_profilesInput;

  @Field(() => MinistryUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => MinistryUpsertWithoutJob_profilesInput)
  upsert?: MinistryUpsertWithoutJob_profilesInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  disconnect?: MinistryWhereInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  delete?: MinistryWhereInput;

  @Field(() => MinistryWhereUniqueInput, { nullable: true })
  @Type(() => MinistryWhereUniqueInput)
  connect?: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;

  @Field(() => MinistryUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => MinistryUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: MinistryUpdateToOneWithWhereWithoutJob_profilesInput;
}
