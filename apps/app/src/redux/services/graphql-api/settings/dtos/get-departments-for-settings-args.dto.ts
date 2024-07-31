export class GetDepartmentsForSettingsArgs {
  where?: {
    effective_status?: {
      in: string[];
    };
    organization?: {
      id?: {
        in: string[];
      };
    };
  };
  orderBy?:
    | { id: 'asc' | 'desc' }
    | { name: 'asc' | 'desc' }
    | { 'organization.name': 'asc' | 'desc' }
    | { effective_status: 'asc' | 'desc' };
  take?: number;
  skip?: number;
}
