import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateWithoutJob_profilesInput } from './professional-designation-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput } from './professional-designation-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';

@InputType()
export class ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput {
  @Field(() => ProfessionalDesignationCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => ProfessionalDesignationCreateWithoutJob_profilesInput)
  create?: ProfessionalDesignationCreateWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  connect?: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;
}
