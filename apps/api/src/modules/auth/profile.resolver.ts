import { Query, Resolver } from '@nestjs/graphql';
import { isEmpty } from 'class-validator';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Profile } from './models/profile.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly peoplesoftService: PeoplesoftService) {}

  @Query(() => Profile, { name: 'profile' })
  async getProfile(@CurrentUser() user: Express.User) {
    const profileRows = (await this.peoplesoftService.getProfile(user.username))?.data?.query?.rows;
    const profile = (profileRows ?? []).length > 0 ? profileRows[0] : null;

    let employeeRows = [];
    let employee: Record<string, any> | null = null;
    if (profile != null && !isEmpty(profile.EMPLID)) {
      employeeRows = (await this.peoplesoftService.getEmployee(profile.EMPLID))?.data?.query?.rows;
      employee = (employeeRows ?? []).length > 0 ? employeeRows[0] : null;
    }

    return {
      id: user.id,
      username: user.username,
      department_id: employee?.DEPTID,
      employee_id: profile?.EMPLID,
      organization_id: employee?.BUSINESS_UNIT,
      position_id: employee?.POSITION_NBR,
    };
  }
}
