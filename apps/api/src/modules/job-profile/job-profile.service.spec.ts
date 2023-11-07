import { Test, TestingModule } from '@nestjs/testing';
import { JobProfileService } from './job-profile.service';

describe('JobProfileService', () => {
  let service: JobProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobProfileService],
    }).compile();

    service = module.get<JobProfileService>(JobProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
