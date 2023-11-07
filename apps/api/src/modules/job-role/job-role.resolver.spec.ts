import { Test, TestingModule } from '@nestjs/testing';
import { JobRoleResolver } from './job-role.resolver';

describe('JobRoleResolver', () => {
  let resolver: JobRoleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobRoleResolver],
    }).compile();

    resolver = module.get<JobRoleResolver>(JobRoleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
