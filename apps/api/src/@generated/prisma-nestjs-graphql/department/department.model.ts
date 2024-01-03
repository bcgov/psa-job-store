import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';
import { PositionRequest } from '../position-request/position-request.model';

@ObjectType()
export class Department {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Organization, { nullable: false })
  organization?: Organization;

  @Field(() => [PositionRequest], { nullable: true })
  PositionRequest?: Array<PositionRequest>;
}
