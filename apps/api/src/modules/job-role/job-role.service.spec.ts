import { Test, TestingModule } from '@nestjs/testing';
import { JobRole } from './job-role.service';

describe('JobRole', () => {
  let service: JobRole;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobRole],
    }).compile();

    service = module.get<JobRole>(JobRole);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
