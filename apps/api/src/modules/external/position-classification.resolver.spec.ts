import { Test, TestingModule } from '@nestjs/testing';
import { PositionClassificationResolver } from './position-classification.resolver';

describe('PositionClassificationResolver', () => {
  let resolver: PositionClassificationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionClassificationResolver],
    }).compile();

    resolver = module.get<PositionClassificationResolver>(PositionClassificationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
