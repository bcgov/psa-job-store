import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateManyInput } from './employee-group-create-many.input';

@ArgsType()
export class CreateManyEmployeeGroupArgs {
  @Field(() => [EmployeeGroupCreateManyInput], { nullable: false })
  @Type(() => EmployeeGroupCreateManyInput)
  data!: Array<EmployeeGroupCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
