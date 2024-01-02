import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateManyLocationInput } from './department-create-many-location.input';
import { Type } from 'class-transformer';

@InputType()
export class DepartmentCreateManyLocationInputEnvelope {
  @Field(() => [DepartmentCreateManyLocationInput], { nullable: false })
  @Type(() => DepartmentCreateManyLocationInput)
  data!: Array<DepartmentCreateManyLocationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
