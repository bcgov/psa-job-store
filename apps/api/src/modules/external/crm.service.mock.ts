import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { IncidentCreateUpdateInput } from './models/incident-create.input';

@Injectable()
export class MockCrmService {
  private mockData: any;

  constructor(private readonly configService: ConfigService<AppConfigDto, true>) {
    const mockDataPath = join(__dirname, '../../../test/mock-crm-data.json');
    this.mockData = JSON.parse(readFileSync(mockDataPath, 'utf8'));
  }

  async syncIncidentStatus() {
    console.log('Mock syncIncidentStatus called');
    return [];
  }

  async getAccountId(idir: string): Promise<number | null> {
    const account = this.mockData.accounts.find((prof) => prof.idir === idir);
    return account ? account.id : -1;
  }

  async getContactId(idir: string): Promise<number | null> {
    console.log('Mock getContactId called with idir:', idir);
    const contact = this.mockData.contacts.find((prof) => prof.idir === idir);
    return contact ? contact.id : -1;
  }

  async createIncident(data: IncidentCreateUpdateInput) {
    console.log('Mock createIncident called with data:', data);
    return {
      id: '123',
      lookupName: '241007-000713',
      statusWithType: { status: { lookupName: 'Solved' } },
      category: { lookupName: 'New Position' },
    };
  }

  async updateIncident(id: number, data: IncidentCreateUpdateInput) {
    console.log('Mock updateIncident called with id:', id, 'and data:', data);
    return {
      id,
      lookupName: '241007-000713',
      statusWithType: { status: { lookupName: 'Solved' } },
      category: { lookupName: 'New Position' },
    };
  }

  async getIncident(id: number) {
    console.log('Mock getIncident called with id:', id);
    return {
      crm_id: id,
      crm_lookup_name: '241007-000713',
      crm_status: 'Solved',
      crm_category: 'New Position',
    };
  }

  async updateIncidentStatus(incidentId: number, newStatus: number) {
    console.log('Mock updateIncidentStatus called with incidentId:', incidentId, 'and newStatus:', newStatus);
    return {
      id: incidentId,
      status: newStatus,
    };
  }
}
