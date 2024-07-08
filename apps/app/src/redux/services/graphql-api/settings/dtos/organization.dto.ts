import { Department } from './department.dto';

export class Organization {
  id: string;
  name: string;
  effective_status: string;
  departments: Department[];
}
