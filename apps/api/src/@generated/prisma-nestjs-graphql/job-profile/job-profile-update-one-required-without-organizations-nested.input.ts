import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutOrganizationsInput } from './job-profile-create-or-connect-without-organizations.input';
import { JobProfileCreateWithoutOrganizationsInput } from './job-profile-create-without-organizations.input';
import { JobProfileUpdateToOneWithWhereWithoutOrganizationsInput } from './job-profile-update-to-one-with-where-without-organizations.input';
import { JobProfileUpsertWithoutOrganizationsInput } from './job-profile-upsert-without-organizations.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

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
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutOrganizationsInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutOrganizationsInput)
  update?: JobProfileUpdateToOneWithWhereWithoutOrganizationsInput;
}
