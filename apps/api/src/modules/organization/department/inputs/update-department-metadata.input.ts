import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentMetadataInput {
  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => Boolean, { nullable: false })
  is_statutorily_excluded!: boolean;
}
