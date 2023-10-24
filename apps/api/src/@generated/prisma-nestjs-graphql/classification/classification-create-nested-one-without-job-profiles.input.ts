import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutJob_profilesInput } from './classification-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutJob_profilesInput } from './classification-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutJob_profilesInput {
  @Field(() => ClassificationCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutJob_profilesInput)
  create?: ClassificationCreateWithoutJob_profilesInput;

  @Field(() => ClassificationCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutJob_profilesInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
