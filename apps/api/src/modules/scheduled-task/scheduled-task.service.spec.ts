import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { ScheduledTask, ScheduledTaskService } from './scheduled-task.service';

jest.mock('../user/user.service', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    syncUsers: jest.fn(),
  })),
}));

describe('ScheduledTaskService', () => {
  let module: TestingModule;
  let scheduledTaskService: ScheduledTaskService;
  let peoplesoftService: PeoplesoftService;
  let crmService: CrmService;

  const mockPrisma = mockDeep<PrismaService>();
  const mockCrmService = mockDeep<CrmService>();
  const mockPeoplesoftService = mockDeep<PeoplesoftService>();
  const mockUserService = mockDeep<UserService>();
  const mockCacheManager = {
    get: jest.fn(),
    del: jest.fn(),
    set: jest.fn(),
  };

  beforeAll(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    jest.resetModules();
    jest.clearAllMocks();
    module = await Test.createTestingModule({
      providers: [
        ScheduledTaskService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
        {
          provide: CrmService,
          useValue: mockCrmService,
        },
        {
          provide: PeoplesoftService,
          useValue: mockPeoplesoftService,
        },
        {
          provide: UserService, // Use the class as the token, not a string
          useValue: mockUserService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    scheduledTaskService = module.get<ScheduledTaskService>(ScheduledTaskService);
    peoplesoftService = module.get<PeoplesoftService>(PeoplesoftService);
    crmService = module.get<CrmService>(CrmService);
  });

  it('should be defined', () => {
    expect(scheduledTaskService).toBeDefined();
    expect(peoplesoftService).toBeDefined();
  });

  describe('isMetadataOutdated', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      // Reset dayjs to a fixed time for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-01T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return true when metadata is null', async () => {
      mockPrisma.scheduledTaskMetadata.findUnique.mockResolvedValue(null);

      // const result = await scheduledTaskService.isMetadataOutdated(ScheduledTask.PeoplesoftSync);
      const result = await (scheduledTaskService['isMetadataOutdated'] as any)(ScheduledTask.PeoplesoftSync);

      expect(result).toBe(true);
      expect(mockPrisma.scheduledTaskMetadata.findUnique).toHaveBeenCalledWith({
        where: { task: ScheduledTask.PeoplesoftSync },
      });
    });

    it('should return true when last_run_at is null', async () => {
      mockPrisma.scheduledTaskMetadata.findUnique.mockResolvedValue({
        task: ScheduledTask.PeoplesoftSync,
        last_run_at: null,
        frequency: 3600,
      });

      const result = await (scheduledTaskService['isMetadataOutdated'] as any)(ScheduledTask.PeoplesoftSync);

      expect(result).toBe(true);
    });

    it('should return true when difference is greater than frequency', async () => {
      const twoHoursAgo = new Date('2024-01-01T10:00:00Z');
      mockPrisma.scheduledTaskMetadata.findUnique.mockResolvedValue({
        task: ScheduledTask.PeoplesoftSync,
        last_run_at: twoHoursAgo,
        frequency: 3600, // 1 hour in seconds
      });

      const result = await (scheduledTaskService['isMetadataOutdated'] as any)(ScheduledTask.PeoplesoftSync);

      expect(result).toBe(true);
    });

    it('should return false when difference is less than frequency', async () => {
      const thirtyMinsAgo = new Date('2024-01-01T11:30:00Z');
      mockPrisma.scheduledTaskMetadata.findUnique.mockResolvedValue({
        task: ScheduledTask.PeoplesoftSync,
        last_run_at: thirtyMinsAgo,
        frequency: 3600, // 1 hour in seconds
      });

      const result = await (scheduledTaskService['isMetadataOutdated'] as any)(ScheduledTask.PeoplesoftSync);

      expect(result).toBe(false);
    });

    it('should return true when difference equals frequency', async () => {
      const oneHourAgo = new Date('2024-01-01T11:00:00Z');
      mockPrisma.scheduledTaskMetadata.findUnique.mockResolvedValue({
        task: ScheduledTask.PeoplesoftSync,
        last_run_at: oneHourAgo,
        frequency: 3600, // 1 hour in seconds
      });

      const result = await (scheduledTaskService['isMetadataOutdated'] as any)(ScheduledTask.PeoplesoftSync);

      expect(result).toBe(true);
    });

    it('should handle database errors', async () => {
      mockPrisma.scheduledTaskMetadata.findUnique.mockRejectedValue(new Error('Database error'));

      await expect((scheduledTaskService['isMetadataOutdated'] as any)(ScheduledTask.PeoplesoftSync)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('syncPeoplesoftData', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should call sync methods if data is outdated', async () => {
      process.env.E2E_TESTING = 'false';
      const spy = jest.spyOn(
        scheduledTaskService as unknown as { isMetadataOutdated: () => Promise<boolean> },
        'isMetadataOutdated',
      );
      spy.mockResolvedValue(true);
      await scheduledTaskService.syncPeoplesoftData();
      expect(peoplesoftService.syncClassifications).toHaveBeenCalled();
      expect(peoplesoftService.syncLocations).toHaveBeenCalled();
      expect(peoplesoftService.syncOrganizationsAndDepartments).toHaveBeenCalled();
    });

    it('should return early when E2E_TESTING is true', async () => {
      process.env.E2E_TESTING = 'true';

      const spy = jest.spyOn(
        scheduledTaskService as unknown as { isMetadataOutdated: () => Promise<boolean> },
        'isMetadataOutdated',
      );
      spy.mockResolvedValue(true);

      await scheduledTaskService.syncPeoplesoftData();
      expect(peoplesoftService.syncClassifications).not.toHaveBeenCalled();
      expect(peoplesoftService.syncLocations).not.toHaveBeenCalled();
      expect(peoplesoftService.syncOrganizationsAndDepartments).not.toHaveBeenCalled();
    });

    it('should not sync when data is not outdated', async () => {
      const spy = jest.spyOn(
        scheduledTaskService as unknown as { isMetadataOutdated: () => Promise<boolean> },
        'isMetadataOutdated',
      );
      spy.mockResolvedValue(false);

      await scheduledTaskService.syncPeoplesoftData();

      expect(peoplesoftService.syncClassifications).not.toHaveBeenCalled();
      expect(peoplesoftService.syncLocations).not.toHaveBeenCalled();
      expect(peoplesoftService.syncOrganizationsAndDepartments).not.toHaveBeenCalled();
    });
  });

  describe('syncPositionStatuses', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('should check if the CRM sync task metadata is outdated and perform sync if needed', async () => {
      (crmService.syncIncidentStatus as jest.Mock).mockResolvedValue([['123', 'OPEN', 'GENERAL']]);

      (mockPrisma.positionRequest.findUnique as jest.Mock).mockResolvedValue({
        crm_id: 123,
        position_number: '12345',
        status: 'PENDING',
        crm_lookup_name: 'TEST',
        submitted_at: new Date(),
      });

      await scheduledTaskService.syncPositionStatuses();

      expect(crmService.syncIncidentStatus).toHaveBeenCalled();
    });
  });
});
