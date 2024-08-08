import { PageInfo } from '../../../dtos/page-info.dto';
import { DepartmentForSettings } from './department-for-settings.dto';

export class GetDepartmentsForSettingsResponse {
  departmentsWithCount: {
    data: DepartmentForSettings[];
    pageInfo: PageInfo;
  };
}
