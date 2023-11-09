import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobFamilyCreateWithoutProfilesInput } from './job-family-create-without-profiles.input';
import { Type } from 'class-transformer';
import { JobFamilyCreateOrConnectWithoutProfilesInput } from './job-family-create-or-connect-without-profiles.input';
import { JobFamilyUpsertWithoutProfilesInput } from './job-family-upsert-without-profiles.input';
import { JobFamilyWhereInput } from './job-family-where.input';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';
import { JobFamilyUpdateToOneWithWhereWithoutProfilesInput } from './job-family-update-to-one-with-where-without-profiles.input';

@InputType()
export class JobFamilyUpdateOneWithoutProfilesNestedInput {
  @Field(() => JobFamilyCreateWithoutProfilesInput, { nullable: true })
  @Type(() => JobFamilyCreateWithoutProfilesInput)
  create?: JobFamilyCreateWithoutProfilesInput;

  @Field(() => JobFamilyCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => JobFamilyCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: JobFamilyCreateOrConnectWithoutProfilesInput;

  @Field(() => JobFamilyUpsertWithoutProfilesInput, { nullable: true })
  @Type(() => JobFamilyUpsertWithoutProfilesInput)
  upsert?: JobFamilyUpsertWithoutProfilesInput;

  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  disconnect?: JobFamilyWhereInput;

  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  delete?: JobFamilyWhereInput;

  @Field(() => JobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobFamilyUpdateToOneWithWhereWithoutProfilesInput, { nullable: true })
  @Type(() => JobFamilyUpdateToOneWithWhereWithoutProfilesInput)
  update?: JobFamilyUpdateToOneWithWhereWithoutProfilesInput;
}
