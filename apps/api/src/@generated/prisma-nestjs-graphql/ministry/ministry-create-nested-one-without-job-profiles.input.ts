import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryCreateWithoutJob_profilesInput } from './ministry-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { MinistryCreateOrConnectWithoutJob_profilesInput } from './ministry-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';

@InputType()
export class MinistryCreateNestedOneWithoutJob_profilesInput {
  @Field(() => MinistryCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => MinistryCreateWithoutJob_profilesInput)
  create?: MinistryCreateWithoutJob_profilesInput;

  @Field(() => MinistryCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => MinistryCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: MinistryCreateOrConnectWithoutJob_profilesInput;

  @Field(() => MinistryWhereUniqueInput, { nullable: true })
  @Type(() => MinistryWhereUniqueInput)
  connect?: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;
}
