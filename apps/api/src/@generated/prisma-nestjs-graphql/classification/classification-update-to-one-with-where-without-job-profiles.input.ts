import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutJob_profilesInput } from './classification-update-without-job-profiles.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutJob_profilesInput)
  data!: ClassificationUpdateWithoutJob_profilesInput;
}
