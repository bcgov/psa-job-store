import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutDesignationsInput } from './job-profile-create-without-designations.input';

@InputType()
export class JobProfileCreateOrConnectWithoutDesignationsInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutDesignationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutDesignationsInput)
  create!: JobProfileCreateWithoutDesignationsInput;
}
