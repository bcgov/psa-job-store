import { Test, TestingModule } from '@nestjs/testing';
import { ImportUserService } from './import-user.service';

describe('ImportUserService', () => {
  let service: ImportUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportUserService],
    }).compile();

    service = module.get<ImportUserService>(ImportUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
