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

  @Field({ nullable: true })
  employeeName?: string;

  @Field({ nullable: true })
  employeeEmail?: string;

  @Field()
  classification: string;

  @Field()
  ministry: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  employeeId?: string;

  @Field({ nullable: true })
  departmentId?: string;

  @Field({ nullable: true })
  organizationId?: string;

  @Field({ nullable: true })
  classificationId?: string;

  @Field({ nullable: true })
  classificationCode?: string;

  @Field(() => String, { nullable: false })
  classificationPeoplesoftId!: string;

  @Field(() => String, { nullable: false })
  classificationEmployeeGroupId!: string;

  @Field(() => String, { nullable: true })
  effectiveDate!: string;
}
