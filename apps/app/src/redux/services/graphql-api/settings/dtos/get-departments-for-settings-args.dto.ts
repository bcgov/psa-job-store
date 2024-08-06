export class GetDepartmentsForSettingsArgs {
  where?: {
    AND: (
      | {
          effective_status?: {
            in: string[];
          };
        }
      | {
          organization_id?: {
            in: string[];
          };
        }
    )[];
  };
  orderBy?:
    | { id: 'asc' | 'desc' }
    | { name: 'asc' | 'desc' }
    | { 'organization.name': 'asc' | 'desc' }
    | { effective_status: 'asc' | 'desc' };
  take?: number;
  skip?: number;
}
