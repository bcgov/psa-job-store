import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateWithoutStreamsInput } from './job-profile-update-without-streams.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutStreamsInput } from './job-profile-create-without-streams.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutStreamsInput {
  @Field(() => JobProfileUpdateWithoutStreamsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutStreamsInput)
  update!: JobProfileUpdateWithoutStreamsInput;

  @Field(() => JobProfileCreateWithoutStreamsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutStreamsInput)
  create!: JobProfileCreateWithoutStreamsInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
