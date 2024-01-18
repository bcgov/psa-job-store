import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutDesignationsInput } from './job-profile-create-without-designations.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutDesignationsInput } from './job-profile-create-or-connect-without-designations.input';
import { JobProfileUpsertWithoutDesignationsInput } from './job-profile-upsert-without-designations.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutDesignationsInput } from './job-profile-update-to-one-with-where-without-designations.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutDesignationsNestedInput {
  @Field(() => JobProfileCreateWithoutDesignationsInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutDesignationsInput)
  create?: JobProfileCreateWithoutDesignationsInput;

  @Field(() => JobProfileCreateOrConnectWithoutDesignationsInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutDesignationsInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutDesignationsInput;

  @Field(() => JobProfileUpsertWithoutDesignationsInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutDesignationsInput)
  upsert?: JobProfileUpsertWithoutDesignationsInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutDesignationsInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutDesignationsInput)
  update?: JobProfileUpdateToOneWithWhereWithoutDesignationsInput;
}
