import { Test, TestingModule } from '@nestjs/testing';
import { MinistryResolver } from './ministry.resolver';

describe('MinistryResolver', () => {
  let resolver: MinistryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinistryResolver],
    }).compile();

    resolver = module.get<MinistryResolver>(MinistryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
