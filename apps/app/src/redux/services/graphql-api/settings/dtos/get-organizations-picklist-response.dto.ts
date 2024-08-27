import { Organization } from './organization.dto';

export class GetOrganizationsPicklistResponse {
  organizations: Pick<Organization, 'id' | 'name'>[];
}
