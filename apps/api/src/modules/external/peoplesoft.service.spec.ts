import { Test, TestingModule } from '@nestjs/testing';
import { PeoplesoftService } from './peoplesoft.service';

describe('PeoplesoftService', () => {
  let service: PeoplesoftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeoplesoftService],
    }).compile();

    service = module.get<PeoplesoftService>(PeoplesoftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
