import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileCareerGroupScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobProfileCareerGroupScalarFieldEnum, {
  name: 'JobProfileCareerGroupScalarFieldEnum',
  description: undefined,
});
