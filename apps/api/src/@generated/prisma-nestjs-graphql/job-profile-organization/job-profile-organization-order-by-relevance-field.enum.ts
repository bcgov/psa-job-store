import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileOrganizationOrderByRelevanceFieldEnum {
  organization_id = 'organization_id',
}

registerEnumType(JobProfileOrganizationOrderByRelevanceFieldEnum, {
  name: 'JobProfileOrganizationOrderByRelevanceFieldEnum',
  description: undefined,
});
