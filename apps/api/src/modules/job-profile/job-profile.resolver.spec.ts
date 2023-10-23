import { Test, TestingModule } from '@nestjs/testing';
import { JobProfileResolver } from './job-profile.resolver';

describe('JobProfileResolver', () => {
  let resolver: JobProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobProfileResolver],
    }).compile();

    resolver = module.get<JobProfileResolver>(JobProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
