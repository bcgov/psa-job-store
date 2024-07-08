export class User {
  id: string;
  name: string;
  email: string;
  username: string;
  roles: string[];
  metadata: {
    crm: {
      account_id: number | null;
      contact_id: number | null;
    };
    org_chart: {
      department_ids: string[];
    };
    peoplesoft: {
      employee_id: string | null;
      position_id: string | null;
      department_id: string | null;
      organization_id: string | null;
    };
  };
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}
