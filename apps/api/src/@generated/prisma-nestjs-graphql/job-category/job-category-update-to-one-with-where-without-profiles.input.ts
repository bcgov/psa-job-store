import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobCategoryWhereInput } from './job-category-where.input';
import { Type } from 'class-transformer';
import { JobCategoryUpdateWithoutProfilesInput } from './job-category-update-without-profiles.input';

@InputType()
export class JobCategoryUpdateToOneWithWhereWithoutProfilesInput {
  @Field(() => JobCategoryWhereInput, { nullable: true })
  @Type(() => JobCategoryWhereInput)
  where?: JobCategoryWhereInput;

  @Field(() => JobCategoryUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => JobCategoryUpdateWithoutProfilesInput)
  data!: JobCategoryUpdateWithoutProfilesInput;
}
