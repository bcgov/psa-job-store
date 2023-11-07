import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateWithoutChildrenInput } from './job-profile-update-without-children.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutChildrenInput } from './job-profile-create-without-children.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutChildrenInput {
  @Field(() => JobProfileUpdateWithoutChildrenInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutChildrenInput)
  update!: JobProfileUpdateWithoutChildrenInput;

  @Field(() => JobProfileCreateWithoutChildrenInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutChildrenInput)
  create!: JobProfileCreateWithoutChildrenInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
