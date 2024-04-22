import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutClassificationsInput } from './job-profile-create-or-connect-without-classifications.input';
import { JobProfileCreateWithoutClassificationsInput } from './job-profile-create-without-classifications.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutClassificationsInput {
  @Field(() => JobProfileCreateWithoutClassificationsInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutClassificationsInput)
  create?: JobProfileCreateWithoutClassificationsInput;

  @Field(() => JobProfileCreateOrConnectWithoutClassificationsInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutClassificationsInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutClassificationsInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
