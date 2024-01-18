import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class EmployeeGroupCount {
  @Field(() => Int, { nullable: false })
  professional_designations?: number;
}
