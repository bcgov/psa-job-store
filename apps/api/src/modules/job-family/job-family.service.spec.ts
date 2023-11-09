import { Test, TestingModule } from '@nestjs/testing';
import { JobFamilyService } from './job-family.service';

describe('JobFamilyService', () => {
  let service: JobFamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFamilyService],
    }).compile();

    service = module.get<JobFamilyService>(JobFamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
