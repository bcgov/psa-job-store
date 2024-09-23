import { PageInfo } from '../../../dtos/page-info.dto';
import { UserForSettings } from './user-for-settings.dto';

export class GetUsersForSettingsResponse {
  usersWithCount: {
    data: UserForSettings[];
    pageInfo: PageInfo;
  };
}
