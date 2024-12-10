import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { MockIncident } from './crm.mock.resolver';
import { IncidentCreateUpdateInput } from './models/incident-create.input';

@Injectable()
export class MockCrmService {
  private mockData: {
    accounts: any[];
    contacts: any[];
    incidents: any[];
  };

  private initialMockData: {
    accounts: any[];
    contacts: any[];
    incidents: any[];
  };

  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {
    const mockDataPath = join(process.cwd(), 'test/mock-crm-data.json');
    this.mockData = JSON.parse(readFileSync(mockDataPath, 'utf8'));

    // Store initial state
    this.initialMockData = JSON.parse(JSON.stringify(this.mockData));

    // Initialize incidents array if it doesn't exist
    if (!this.mockData.incidents) {
      this.mockData.incidents = [];
      this.initialMockData.incidents = [];
    }
  }

  async resetMockData(): Promise<boolean> {
    try {
      console.log('resetting crm mock data');
      this.mockData = JSON.parse(JSON.stringify(this.initialMockData));
      return true;
    } catch (error) {
      console.error('Error resetting mock data:', error);
      return false;
    }
  }

  async syncIncidentStatus() {
    //  Must return crm_id, crm_lookup_name, crm_status, crm_category as [string, string, string, string];
    // in an array of rows
    return this.mockData.incidents.map(
      (incident) =>
        [
          incident.id, // crm_id
          incident.lookupName, // crm_lookup_name
          incident.statusWithType?.status?.lookupName || 'Unknown', // crm_status
          incident.category?.lookupName || 'New Position', // crm_category
        ] as [string, string, string, string],
    );
  }

  async getAccountId(idir: string): Promise<number | null> {
    const account = this.mockData.accounts.find((prof) => prof.idir === idir);
    return account ? account.id : -1;
  }

  async getContactId(idir: string): Promise<number | null> {
    const contact = this.mockData.contacts.find((prof) => prof.idir === idir);
    return contact ? contact.id : -1;
  }

  async createIncident(data: IncidentCreateUpdateInput) {
    console.log('Creating mock incident');

    let lookupName: string;
    let isUnique = false;

    // Keep generating random IDs until we find a unique one
    while (!isUnique) {
      lookupName = `241007-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
      isUnique = !this.mockData.incidents.some((incident) => incident.lookupName === lookupName);
    }

    const statusMap = {
      8: 'Updated',
      1: 'Unresolved',
      2: 'Solved',
    };

    const newIncident = {
      ...data,
      id: String(Math.floor(Math.random() * 1000000)), // Random ID instead of incrementing
      lookupName: lookupName,
      statusWithType: {
        status: {
          id: data.statusWithType?.status?.id || 2,
          lookupName: statusMap[data.statusWithType?.status?.id || 2],
        },
      },
      category: { lookupName: 'New Position' },
    };

    // Check if the random ID already exists
    if (this.mockData.incidents.some((incident) => incident.id === newIncident.id)) {
      throw new Error('Generated ID already exists. Please try again.');
    }

    console.log('pushing new incident');
    this.mockData.incidents.push(newIncident);
    return newIncident;
  }

  async updateIncident(id: number, data: IncidentCreateUpdateInput) {
    console.log('Updating mock incident with id:', id);
    const incidentIndex = this.mockData.incidents.findIndex((inc) => inc.id === String(id));

    if (incidentIndex === -1) {
      throw new Error(`Incident with id ${id} not found`);
    }

    const statusMap = {
      8: 'Updated',
      1: 'Unresolved',
      2: 'Solved',
      3: 'Waiting - Client',
      101: 'Waiting - Internal',
      102: 'SolvedTraining',
      106: 'WaitingVendor',
      107: 'Discontinued',
    };

    const updatedIncident = {
      ...this.mockData.incidents[incidentIndex], // spread existing incident first
      ...data, // spread new data
      // then override with our guaranteed structure
      id: String(id),
      statusWithType: {
        status: {
          id: data.statusWithType?.status?.id || this.mockData.incidents[incidentIndex].statusWithType?.status?.id,
          lookupName:
            statusMap[data.statusWithType?.status?.id] ||
            this.mockData.incidents[incidentIndex].statusWithType?.status?.lookupName,
        },
      },
      category: {
        lookupName: this.mockData.incidents[incidentIndex].category?.lookupName, // || data.category  - this is in format like this: "{ id: 1930 }"
      },
    };

    this.mockData.incidents[incidentIndex] = updatedIncident;
    return updatedIncident;
  }

  async updateMockIncident(id: number, data: IncidentCreateUpdateInput) {
    const incidentIndex = this.mockData.incidents.findIndex((inc) => inc.id === String(id));

    if (incidentIndex === -1) {
      throw new Error(`Incident with id ${id} not found`);
    }

    const statusMap = {
      8: 'Updated',
      1: 'Unresolved',
      2: 'Solved',
      3: 'Waiting - Client',
      101: 'Waiting - Internal',
      102: 'SolvedTraining',
      106: 'WaitingVendor',
      107: 'Discontinued',
    };

    const updatedIncident = {
      ...this.mockData.incidents[incidentIndex], // spread existing incident first
      ...data, // spread new data
      // then override with our guaranteed structure
      id: String(id),
      statusWithType: {
        status: {
          id: data.statusWithType?.status?.id || this.mockData.incidents[incidentIndex].statusWithType?.status?.id,
          lookupName:
            statusMap[data.statusWithType?.status?.id] ||
            this.mockData.incidents[incidentIndex].statusWithType?.status?.lookupName,
        },
      },
      category: {
        lookupName: data.category || this.mockData.incidents[incidentIndex].category?.lookupName,
      },
    };

    this.mockData.incidents[incidentIndex] = updatedIncident;
    return updatedIncident;
  }

  async getIncident(id: number) {
    console.log('Getting mock incident with id:', id);
    const incident = this.mockData.incidents.find((inc) => inc.id === String(id));

    if (!incident) {
      throw new Error(`Incident with id ${id} not found`);
    }

    // console.log('parsing incident:', incident);
    const parsed = {
      crm_id: parseInt(incident.id),
      crm_lookup_name: incident.lookupName,
      crm_status: incident.statusWithType?.status?.lookupName || 'Unknown',
      crm_category: incident.category?.lookupName || 'Unknown',
    };

    // console.log('parsed: ', parsed);
    return parsed;
  }

  async updateIncidentStatus(incidentId: number, newStatus: number) {
    console.log('Updating mock incident status with id:', incidentId, newStatus);

    const incidentIndex = this.mockData.incidents.findIndex((inc) => inc.id === String(incidentId));

    if (incidentIndex === -1) {
      throw new Error(`Incident with id ${incidentId} not found`);
    }

    this.mockData.incidents[incidentIndex].statusWithType.status.lookupName =
      typeof newStatus === 'number' ? String(newStatus) : newStatus;

    const incident = this.mockData.incidents[incidentIndex];
    return {
      crm_id: incidentId,
      crm_status: newStatus,
      crm_lookup_name: incident.lookupName,
      crm_category: incident.category?.lookupName || 'Unknown',
    };
  }

  async getAllIncidents(): Promise<MockIncident[]> {
    return this.mockData.incidents;
  }
}
