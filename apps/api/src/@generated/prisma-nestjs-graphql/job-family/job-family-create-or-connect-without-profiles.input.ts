import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';
import { Type } from 'class-transformer';
import { JobFamilyCreateWithoutProfilesInput } from './job-family-create-without-profiles.input';

@InputType()
export class JobFamilyCreateOrConnectWithoutProfilesInput {
  @Field(() => JobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobFamilyCreateWithoutProfilesInput, { nullable: false })
  @Type(() => JobFamilyCreateWithoutProfilesInput)
  create!: JobFamilyCreateWithoutProfilesInput;
}
