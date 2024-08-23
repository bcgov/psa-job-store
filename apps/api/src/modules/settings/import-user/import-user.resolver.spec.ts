import { Test, TestingModule } from '@nestjs/testing';
import { ImportUserResolver } from './import-user.resolver';

describe('ImportUserResolver', () => {
  let resolver: ImportUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportUserResolver],
    }).compile();

    resolver = module.get<ImportUserResolver>(ImportUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
