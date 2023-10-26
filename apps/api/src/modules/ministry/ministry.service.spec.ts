import { Test, TestingModule } from '@nestjs/testing';
import { MinistryService } from './ministry.service';

describe('MinistryService', () => {
  let service: MinistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinistryService],
    }).compile();

    service = module.get<MinistryService>(MinistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
