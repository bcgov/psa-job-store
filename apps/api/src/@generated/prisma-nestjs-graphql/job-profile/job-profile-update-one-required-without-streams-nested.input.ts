import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutStreamsInput } from './job-profile-create-without-streams.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutStreamsInput } from './job-profile-create-or-connect-without-streams.input';
import { JobProfileUpsertWithoutStreamsInput } from './job-profile-upsert-without-streams.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutStreamsInput } from './job-profile-update-to-one-with-where-without-streams.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutStreamsNestedInput {
  @Field(() => JobProfileCreateWithoutStreamsInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutStreamsInput)
  create?: JobProfileCreateWithoutStreamsInput;

  @Field(() => JobProfileCreateOrConnectWithoutStreamsInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutStreamsInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutStreamsInput;

  @Field(() => JobProfileUpsertWithoutStreamsInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutStreamsInput)
  upsert?: JobProfileUpsertWithoutStreamsInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutStreamsInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutStreamsInput)
  update?: JobProfileUpdateToOneWithWhereWithoutStreamsInput;
}
