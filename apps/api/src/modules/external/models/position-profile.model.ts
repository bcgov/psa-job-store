import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionProfile {
  @Field()
  positionNumber: string;

  @Field()
  positionDescription: string;

  @Field()
  departmentName: string;

  // ... other fields from the position you want to include

  // @Field()
  // employeeId: string;

  @Field()
  employeeName: string;

  @Field()
  classification: string;

  @Field()
  ministry: string;

  @Field()
  status: string;
}
