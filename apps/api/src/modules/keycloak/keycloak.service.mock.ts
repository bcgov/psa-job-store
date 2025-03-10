import { IDIRUserQuery } from '@bcgov/citz-imb-sso-css-api';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class MockKeycloakService extends KeycloakService {
  private mockData: any;
  private initialMockData: any;

  constructor() {
    super();
    const mockDataPath = join(process.cwd(), 'test/mock-peoplesoft-data.json');
    this.mockData = JSON.parse(readFileSync(mockDataPath, 'utf8'));

    this.initialMockData = JSON.parse(JSON.stringify(this.mockData));
  }

  async findUsers(field: keyof IDIRUserQuery, value: string) {
    console.log('mock keycloak findUsers called with field:', field, 'value:', value);
    // this.getProfilesWithEmployeeIds();
    if (field !== 'email') {
      return super.findUsers(field, value);
    }

    console.log('this.mockData.profiles: ', this.mockData.profiles);

    const matchingProfiles = this.mockData.profiles.filter((profile) => {
      const nameParts = profile.name.split(' ');
      const dotName = `${nameParts[0]}.${nameParts[1]}`.toLowerCase();
      return dotName.includes(value.toLowerCase());
    });

    console.log('matchingProfiles: ', JSON.stringify(matchingProfiles, null, 2));

    return matchingProfiles.map((profile) => {
      const [firstName, lastName] = profile.name.split(' ');
      const idirUsername = profile.idir;
      const mockGuid = uuidv4().toUpperCase();

      return {
        username: `${mockGuid}@idir`,
        email: profile.email,
        firstName,
        lastName,
        attributes: {
          idir_user_guid: [mockGuid],
          idir_username: [idirUsername],
          display_name: [`${lastName}, ${firstName} CITZ:EX`],
        },
      };
    });
  }
}
