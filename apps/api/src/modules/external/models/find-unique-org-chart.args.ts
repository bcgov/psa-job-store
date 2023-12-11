import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrgChartWhereUniqueInput } from './org-chart-where-unique.input';

@ArgsType()
export class FindUniqueOrgChartArgs {
  @Field(() => OrgChartWhereUniqueInput, { nullable: false })
  @Type(() => OrgChartWhereUniqueInput)
  where!: Prisma.AtLeast<OrgChartWhereUniqueInput, 'department_id'>;
}
