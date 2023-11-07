import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryUpdateWithoutJob_profilesInput } from './ministry-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { MinistryCreateWithoutJob_profilesInput } from './ministry-create-without-job-profiles.input';
import { MinistryWhereInput } from './ministry-where.input';

@InputType()
export class MinistryUpsertWithoutJob_profilesInput {
  @Field(() => MinistryUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => MinistryUpdateWithoutJob_profilesInput)
  update!: MinistryUpdateWithoutJob_profilesInput;

  @Field(() => MinistryCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => MinistryCreateWithoutJob_profilesInput)
  create!: MinistryCreateWithoutJob_profilesInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;
}
