import { Test, TestingModule } from '@nestjs/testing';
import { OrgChartService } from './org-chart.service';

describe('OrgChartService', () => {
  let service: OrgChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgChartService],
    }).compile();

    service = module.get<OrgChartService>(OrgChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
