import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';

@ObjectType()
export class JobProfileRoleMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => JobProfileRoleType, { nullable: true })
  type?: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: true })
  name?: string;
}
