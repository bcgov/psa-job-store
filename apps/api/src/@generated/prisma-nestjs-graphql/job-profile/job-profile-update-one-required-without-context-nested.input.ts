import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutContextInput } from './job-profile-create-without-context.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutContextInput } from './job-profile-create-or-connect-without-context.input';
import { JobProfileUpsertWithoutContextInput } from './job-profile-upsert-without-context.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutContextInput } from './job-profile-update-to-one-with-where-without-context.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutContextNestedInput {
  @Field(() => JobProfileCreateWithoutContextInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutContextInput)
  create?: JobProfileCreateWithoutContextInput;

  @Field(() => JobProfileCreateOrConnectWithoutContextInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutContextInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutContextInput;

  @Field(() => JobProfileUpsertWithoutContextInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutContextInput)
  upsert?: JobProfileUpsertWithoutContextInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutContextInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutContextInput)
  update?: JobProfileUpdateToOneWithWhereWithoutContextInput;
}
