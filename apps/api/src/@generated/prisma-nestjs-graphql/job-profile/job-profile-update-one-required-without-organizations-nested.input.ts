import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutOrganizationsInput } from './job-profile-create-without-organizations.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutOrganizationsInput } from './job-profile-create-or-connect-without-organizations.input';
import { JobProfileUpsertWithoutOrganizationsInput } from './job-profile-upsert-without-organizations.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutOrganizationsInput } from './job-profile-update-to-one-with-where-without-organizations.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutOrganizationsNestedInput {
  @Field(() => JobProfileCreateWithoutOrganizationsInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutOrganizationsInput)
  create?: JobProfileCreateWithoutOrganizationsInput;

  @Field(() => JobProfileCreateOrConnectWithoutOrganizationsInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutOrganizationsInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutOrganizationsInput;

  @Field(() => JobProfileUpsertWithoutOrganizationsInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutOrganizationsInput)
  upsert?: JobProfileUpsertWithoutOrganizationsInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutOrganizationsInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutOrganizationsInput)
  update?: JobProfileUpdateToOneWithWhereWithoutOrganizationsInput;
}
