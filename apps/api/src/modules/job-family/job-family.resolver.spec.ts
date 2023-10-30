import { Test, TestingModule } from '@nestjs/testing';
import { JobFamilyResolver } from './job-family.resolver';

describe('JobFamilyResolver', () => {
  let resolver: JobFamilyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFamilyResolver],
    }).compile();

    resolver = module.get<JobFamilyResolver>(JobFamilyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
