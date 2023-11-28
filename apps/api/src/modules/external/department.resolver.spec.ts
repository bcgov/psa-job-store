import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentResolver } from './department.resolver';

describe('DepartmentResolver', () => {
  let resolver: DepartmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentResolver],
    }).compile();

    resolver = module.get<DepartmentResolver>(DepartmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
