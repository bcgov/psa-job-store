import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutOrganizationsInput } from './job-profile-create-without-organizations.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateOrConnectWithoutOrganizationsInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutOrganizationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOrganizationsInput)
  create!: JobProfileCreateWithoutOrganizationsInput;
}
