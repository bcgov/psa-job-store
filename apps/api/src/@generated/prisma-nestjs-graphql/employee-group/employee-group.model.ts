import { Field, ObjectType } from '@nestjs/graphql';
import { Classification } from '../classification/classification.model';

@ObjectType()
export class EmployeeGroup {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [Classification], { nullable: true })
  classifications?: Array<Classification>;
}
