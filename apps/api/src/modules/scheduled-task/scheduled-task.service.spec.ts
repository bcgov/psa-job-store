import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getALStatus } from 'common-kit';
import 'jest';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';
import { ScheduledTaskService } from './scheduled-task.service';

describe('ScheduledTaskService', () => {
  let service: ScheduledTaskService;
  // let crmService: CrmService;
  let peoplesoftService: PeoplesoftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ScheduledTaskService,
        { provide: PrismaService, useValue: { scheduledTaskMetadata: { findUnique: jest.fn(), upsert: jest.fn() } } },
        { provide: CrmService, useValue: { syncIncidentStatus: jest.fn() } },
        {
          provide: PeoplesoftService,
          useValue: {
            syncClassifications: jest.fn(),
            syncLocations: jest.fn(),
            syncOrganizationsAndDepartments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ScheduledTaskService>(ScheduledTaskService);
    peoplesoftService = module.get<PeoplesoftService>(PeoplesoftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('isMetadataOutdated', () => {
  //   it('should return true if metadata is null', async () => {
  //     prismaService.scheduledTaskMetadata.findUnique.mockResolvedValue(null);
  //     expect(await service.isMetadataOutdated(ScheduledTask.CrmSync)).toBeTruthy();
  //   });

  //   // Additional tests for different scenarios...
  // });

  describe('syncPeoplesoftData', () => {
    it('should call sync methods if data is outdated', async () => {
      // jest.spyOn(service, 'isMetadataOutdated').mockResolvedValue(true);
      await service.syncPeoplesoftData();
      expect(peoplesoftService.syncClassifications).toHaveBeenCalled();
      expect(peoplesoftService.syncLocations).toHaveBeenCalled();
      expect(peoplesoftService.syncOrganizationsAndDepartments).toHaveBeenCalled();
    });

    // Additional tests for different scenarios...
  });

  // describe('syncPositionStatuses', () => {
  //   it('should check if the CRM sync task metadata is outdated and perform sync if needed', async () => {
  //     (crmService.syncIncidentStatus as jest.Mock).mockResolvedValue([['123', 'OPEN', 'GENERAL']]);

  //     await service.syncPositionStatuses();

  //     expect(crmService.syncIncidentStatus).toHaveBeenCalled();
  //   });

  //   // Additional tests can be written here to handle specific edge cases, such as error handling, conditional updates, etc.
  // });

  describe('getALStatus', () => {
    // Define test cases for each defined scenario
    const testCases = [
      {
        description: "should return 'VERIFICATION' for 'New Position', 'Proposed', and 'Unresolved'",
        context: {
          category: 'New Position',
          crm_status: 'Unresolved',
          ps_status: 'Proposed',
          ps_effective_status: 'Active',
        },
        expected: 'VERIFICATION',
      },
      {
        description: "should return 'ACTION_REQUIRED' for 'Classification', 'Waiting - Client', and 'Proposed'",
        context: {
          category: 'Classification',
          crm_status: 'Waiting - Client',
          ps_status: 'Proposed',
          al_status: 'DRAFT',
          ps_effective_status: 'Active',
        },
        expected: 'ACTION_REQUIRED',
      },
      {
        description: "should return 'REVIEW' for 'Classification', 'Updated', and 'Proposed'",
        context: {
          category: 'Classification',
          crm_status: 'Updated',
          ps_status: 'Proposed',
          ps_effective_status: 'Active',
        },
        expected: 'REVIEW',
      },
      {
        description: "should return 'COMPLETED' for 'Classification', 'Solved', and 'Approved'",
        context: {
          category: 'Classification',
          crm_status: 'Solved',
          ps_status: 'Approved',
          ps_effective_status: 'Active',
        },
        expected: 'COMPLETED',
      },
      {
        description: "should return 'COMPLETED' for 'Inactive'",
        context: {
          category: 'New Position',
          crm_status: 'Updated',
          ps_status: 'Proposed',
          ps_effective_status: 'Inactive',
        },
        expected: 'COMPLETED',
      },
      {
        description: "should return 'UNKNOWN' for unsupported status combinations",
        context: {
          category: 'New Position',
          crm_status: 'Solved',
          ps_status: 'Proposed',
          ps_effective_status: 'Active',
        },
        expected: 'UNKNOWN',
      },
    ];

    // Execute each test case
    testCases.forEach(({ description, context, expected }) => {
      it(description, () => {
        const result = getALStatus(context);
        expect(result).toEqual(expected);
      });
    });
  });
});
