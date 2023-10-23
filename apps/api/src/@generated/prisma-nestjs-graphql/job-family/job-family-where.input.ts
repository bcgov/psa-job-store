import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobFamilyWhereInput {
  @Field(() => [JobFamilyWhereInput], { nullable: true })
  AND?: Array<JobFamilyWhereInput>;

  @Field(() => [JobFamilyWhereInput], { nullable: true })
  OR?: Array<JobFamilyWhereInput>;

  @Field(() => [JobFamilyWhereInput], { nullable: true })
  NOT?: Array<JobFamilyWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;
}
