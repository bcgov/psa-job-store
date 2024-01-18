import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutDesignationsInput } from './job-profile-update-without-designations.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutDesignationsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutDesignationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutDesignationsInput)
  data!: JobProfileUpdateWithoutDesignationsInput;
}
