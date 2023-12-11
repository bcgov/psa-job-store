import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from './job-profile-state.enum';

@InputType()
export class EnumJobProfileStateFieldUpdateOperationsInput {
  @Field(() => JobProfileState, { nullable: true })
  set?: keyof typeof JobProfileState;
}
