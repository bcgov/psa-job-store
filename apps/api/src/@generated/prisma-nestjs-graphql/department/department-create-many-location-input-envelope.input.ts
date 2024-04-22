import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentCreateManyLocationInput } from './department-create-many-location.input';

@InputType()
export class DepartmentCreateManyLocationInputEnvelope {
  @Field(() => [DepartmentCreateManyLocationInput], { nullable: false })
  @Type(() => DepartmentCreateManyLocationInput)
  data!: Array<DepartmentCreateManyLocationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
