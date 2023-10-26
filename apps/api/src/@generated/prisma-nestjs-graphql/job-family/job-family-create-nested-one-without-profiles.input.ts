import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobFamilyCreateWithoutProfilesInput } from './job-family-create-without-profiles.input';
import { Type } from 'class-transformer';
import { JobFamilyCreateOrConnectWithoutProfilesInput } from './job-family-create-or-connect-without-profiles.input';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';

@InputType()
export class JobFamilyCreateNestedOneWithoutProfilesInput {
  @Field(() => JobFamilyCreateWithoutProfilesInput, { nullable: true })
  @Type(() => JobFamilyCreateWithoutProfilesInput)
  create?: JobFamilyCreateWithoutProfilesInput;

  @Field(() => JobFamilyCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => JobFamilyCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: JobFamilyCreateOrConnectWithoutProfilesInput;

  @Field(() => JobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;
}
