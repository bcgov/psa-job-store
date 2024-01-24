import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateWithoutContextInput } from './job-profile-update-without-context.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutContextInput } from './job-profile-create-without-context.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutContextInput {
  @Field(() => JobProfileUpdateWithoutContextInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutContextInput)
  update!: JobProfileUpdateWithoutContextInput;

  @Field(() => JobProfileCreateWithoutContextInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutContextInput)
  create!: JobProfileCreateWithoutContextInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
