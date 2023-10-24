import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class ClassificationScalarWhereInput {
  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  AND?: Array<ClassificationScalarWhereInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  OR?: Array<ClassificationScalarWhereInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  NOT?: Array<ClassificationScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  grid_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  occupation_group_id?: IntFilter;
}
