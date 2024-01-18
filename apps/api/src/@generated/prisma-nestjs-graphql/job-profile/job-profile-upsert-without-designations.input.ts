import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateWithoutDesignationsInput } from './job-profile-update-without-designations.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutDesignationsInput } from './job-profile-create-without-designations.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutDesignationsInput {
  @Field(() => JobProfileUpdateWithoutDesignationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutDesignationsInput)
  update!: JobProfileUpdateWithoutDesignationsInput;

  @Field(() => JobProfileCreateWithoutDesignationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutDesignationsInput)
  create!: JobProfileCreateWithoutDesignationsInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
