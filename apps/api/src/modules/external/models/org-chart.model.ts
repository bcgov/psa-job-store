import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Classification, Department } from '../../../@generated/prisma-nestjs-graphql';
import { Employee } from './employee.model';

@ObjectType()
export class OrgChartEdge {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  source: string;

  @Field(() => String, { nullable: false })
  target: string;

  @Field(() => String, { nullable: false })
  type: string;
}

@ObjectType()
export class OrgChartNodeData {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title?: string;

  @Field(() => Classification, { nullable: true })
  classification?: Classification;

  @Field(() => Department, { nullable: true })
  department?: Department;

  @Field(() => [Employee], { nullable: false })
  employees?: Employee[];
}

@ObjectType()
export class OrgChartNodePosition {
  @Field(() => Int, { nullable: false })
  x: number;

  @Field(() => Int, { nullable: false })
  y: number;
}

@ObjectType()
export class OrgChartNode {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  type?: string;

  @Field(() => OrgChartNodeData, { nullable: false })
  data?: OrgChartNodeData;

  @Field(() => OrgChartNodePosition, { nullable: false })
  position: OrgChartNodePosition;
}

@ObjectType()
export class OrgChart {
  @Field(() => [OrgChartEdge], { nullable: false })
  edges?: OrgChartEdge[];

  @Field(() => [OrgChartNode], { nullable: false })
  nodes?: OrgChartNode[];
}
