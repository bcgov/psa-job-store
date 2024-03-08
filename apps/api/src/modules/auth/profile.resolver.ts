import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { isEmpty } from 'class-validator';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AllowNoRoles } from './guards/role-global.guard';
import { Profile } from './models/profile.model';

@ObjectType()
class LogoutResponse {
  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly peoplesoftService: PeoplesoftService,
    private authService: AuthService,
  ) {}

  @Query(() => LogoutResponse, { name: 'logout' })
  @AllowNoRoles()
  async logout(@CurrentUser() { id: userId }: Express.User) {
    if (true) await this.authService.logoutUser(userId);
    return { success: true };
  }

  @Query(() => Profile, { name: 'profile' })
  async getProfile(@CurrentUser() user: Express.User) {
    const peoplesoftProfile = (await this.peoplesoftService.getProfile(user.username))?.data?.query?.rows;
    const peoplesoftProfileData = (peoplesoftProfile ?? []).length > 0 ? peoplesoftProfile[0] : null;

    let employeeRows = [];
    let employee: Record<string, any> | null = null;
    if (peoplesoftProfileData != null && !isEmpty(peoplesoftProfileData.EMPLID)) {
      employeeRows = (await this.peoplesoftService.getEmployee(peoplesoftProfileData.EMPLID))?.data?.query?.rows;
      employee = (employeeRows ?? []).length > 0 ? employeeRows[0] : null;
    }

    return {
      id: user.id,
      username: user.username,
      department_id: process.env.TEST_ENV === 'true' ? '112-0072' : employee?.DEPTID,
      employee_id: peoplesoftProfileData?.EMPLID,
      organization_id: employee?.BUSINESS_UNIT,
      position_id: employee?.POSITION_NBR,
      metadata: user.metadata,
    };
  }
}
