import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutDesignationsInput } from './job-profile-create-without-designations.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutDesignationsInput } from './job-profile-create-or-connect-without-designations.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutDesignationsInput {
  @Field(() => JobProfileCreateWithoutDesignationsInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutDesignationsInput)
  create?: JobProfileCreateWithoutDesignationsInput;

  @Field(() => JobProfileCreateOrConnectWithoutDesignationsInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutDesignationsInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutDesignationsInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;
}
