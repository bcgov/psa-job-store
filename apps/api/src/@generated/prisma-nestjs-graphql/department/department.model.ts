import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Location } from '../location/location.model';
import { Organization } from '../organization/organization.model';
import { PositionRequest } from '../position-request/position-request.model';
import { ClassificationDepartment } from '../classification-department/classification-department.model';

@ObjectType()
export class Department {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  location_id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date;

  @Field(() => Location, { nullable: false })
  location?: Location;

  @Field(() => Organization, { nullable: false })
  organization?: Organization;

  @Field(() => [PositionRequest], { nullable: true })
  PositionRequest?: Array<PositionRequest>;

  @Field(() => [PositionRequest], { nullable: true })
  PositionRequestsByPaylistDepartment?: Array<PositionRequest>;

  @Field(() => [ClassificationDepartment], { nullable: true })
  classifications?: Array<ClassificationDepartment>;
}
