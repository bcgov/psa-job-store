import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileCount {
  @Field(() => Int, { nullable: false })
  behavioural_competencies?: number;

  @Field(() => Int, { nullable: false })
  classifications?: number;

  @Field(() => Int, { nullable: false })
  organizations?: number;

  @Field(() => Int, { nullable: false })
  jobFamilies?: number;

  @Field(() => Int, { nullable: false })
  streams?: number;

  @Field(() => Int, { nullable: false })
  reports_to?: number;

  @Field(() => Int, { nullable: false })
  position_request?: number;
}
