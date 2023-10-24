import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryWhereInput } from './ministry-where.input';
import { Type } from 'class-transformer';
import { MinistryUpdateWithoutJob_profilesInput } from './ministry-update-without-job-profiles.input';

@InputType()
export class MinistryUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;

  @Field(() => MinistryUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => MinistryUpdateWithoutJob_profilesInput)
  data!: MinistryUpdateWithoutJob_profilesInput;
}
