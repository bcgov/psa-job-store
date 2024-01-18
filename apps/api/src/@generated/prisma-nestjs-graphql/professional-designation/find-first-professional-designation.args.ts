import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput } from './professional-designation-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ProfessionalDesignationScalarFieldEnum } from './professional-designation-scalar-field.enum';

@ArgsType()
export class FindFirstProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;

  @Field(() => [ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ProfessionalDesignationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ProfessionalDesignationScalarFieldEnum>;
}
