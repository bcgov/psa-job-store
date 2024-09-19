export type UserForSettings = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  metadata?: {
    crm?: {
      account_id?: number;
      contact_id?: number;
    };
    org_chart?: {
      department_ids?: string[];
    };
    peoplesoft?: {
      employee_id?: string;
      department_id?: string;
      organization_id?: string;
      position_id?: string;
    };
  };
};
