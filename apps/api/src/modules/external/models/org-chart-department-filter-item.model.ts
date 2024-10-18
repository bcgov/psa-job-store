import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrgChartDepartmentFilterItemChild {
  @Field(() => String)
  label: string;

  @Field(() => String)
  value: string;

  @Field(() => String)
  filterString: string;

  @Field(() => String)
  location_id: string;

  @Field(() => String)
  location_name: string;
}

@ObjectType()
export class OrgChartDepartmentFilterItem {
  @Field(() => String, { nullable: false })
  label: string;

  @Field(() => String, { nullable: false })
  value: string;

  @Field(() => Boolean, { nullable: false })
  selectable: boolean;

  @Field(() => [OrgChartDepartmentFilterItemChild], { nullable: false })
  children: OrgChartDepartmentFilterItemChild[];
}
