import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutStreamsInput } from './job-profile-create-or-connect-without-streams.input';
import { JobProfileCreateWithoutStreamsInput } from './job-profile-create-without-streams.input';
import { JobProfileUpdateToOneWithWhereWithoutStreamsInput } from './job-profile-update-to-one-with-where-without-streams.input';
import { JobProfileUpsertWithoutStreamsInput } from './job-profile-upsert-without-streams.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

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
