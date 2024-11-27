export class Position {
  id: string;
  supervisor_id: string;
  title: string;
  classification: {
    id: string;
    employee_group_id: string;
    peoplesoft_id: string;
    code: string;
    name: string;
  };
  organization: {
    id: string;
    name: string;
  };
  department: {
    id: string;
    name: string;
  };
}
