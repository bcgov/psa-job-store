import { Test, TestingModule } from '@nestjs/testing';
import { OrgChartResolver } from './org-chart.resolver';

describe('OrgChartResolver', () => {
  let resolver: OrgChartResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgChartResolver],
    }).compile();

    resolver = module.get<OrgChartResolver>(OrgChartResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
