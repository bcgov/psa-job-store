import { Test, TestingModule } from '@nestjs/testing';
import { CssApiService } from './css-api.service';

describe('CssApiService', () => {
  let service: CssApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CssApiService],
    }).compile();

    service = module.get<CssApiService>(CssApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
