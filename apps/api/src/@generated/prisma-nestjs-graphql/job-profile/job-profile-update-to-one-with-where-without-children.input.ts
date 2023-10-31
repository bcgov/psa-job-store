import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutChildrenInput } from './job-profile-update-without-children.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutChildrenInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutChildrenInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutChildrenInput)
  data!: JobProfileUpdateWithoutChildrenInput;
}
