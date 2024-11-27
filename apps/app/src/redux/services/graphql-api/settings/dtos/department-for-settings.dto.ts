export class DepartmentForSettings {
  id: string;
  location_id?: string;
  effective_status: string;
  name: string;
  metadata?: {
    is_statutorily_excluded: boolean;
  };
  organization: {
    name: string;
  };
}
