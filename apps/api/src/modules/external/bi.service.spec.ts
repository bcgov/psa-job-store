import { Test, TestingModule } from '@nestjs/testing';
import { BIService } from './bi.service';

describe('BIService', () => {
  let service: BIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BIService],
    }).compile();

    service = module.get<BIService>(BIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
