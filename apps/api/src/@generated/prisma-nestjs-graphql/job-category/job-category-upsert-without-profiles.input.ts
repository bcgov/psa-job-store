import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobCategoryUpdateWithoutProfilesInput } from './job-category-update-without-profiles.input';
import { Type } from 'class-transformer';
import { JobCategoryCreateWithoutProfilesInput } from './job-category-create-without-profiles.input';
import { JobCategoryWhereInput } from './job-category-where.input';

@InputType()
export class JobCategoryUpsertWithoutProfilesInput {
  @Field(() => JobCategoryUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => JobCategoryUpdateWithoutProfilesInput)
  update!: JobCategoryUpdateWithoutProfilesInput;

  @Field(() => JobCategoryCreateWithoutProfilesInput, { nullable: false })
  @Type(() => JobCategoryCreateWithoutProfilesInput)
  create!: JobCategoryCreateWithoutProfilesInput;

  @Field(() => JobCategoryWhereInput, { nullable: true })
  @Type(() => JobCategoryWhereInput)
  where?: JobCategoryWhereInput;
}
