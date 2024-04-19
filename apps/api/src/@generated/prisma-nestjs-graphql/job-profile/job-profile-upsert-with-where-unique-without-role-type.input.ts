import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutRole_typeInput } from './job-profile-create-without-role-type.input';
import { JobProfileUpdateWithoutRole_typeInput } from './job-profile-update-without-role-type.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutRole_typeInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateWithoutRole_typeInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutRole_typeInput)
  update!: JobProfileUpdateWithoutRole_typeInput;

  @Field(() => JobProfileCreateWithoutRole_typeInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutRole_typeInput)
  create!: JobProfileCreateWithoutRole_typeInput;
}
