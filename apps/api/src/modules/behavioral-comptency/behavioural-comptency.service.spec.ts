import { Test, TestingModule } from '@nestjs/testing';
import { BehaviouralComptencyService } from './behavioural-comptency.service';

describe('BehaviouralComptencyService', () => {
  let service: BehaviouralComptencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BehaviouralComptencyService],
    }).compile();

    service = module.get<BehaviouralComptencyService>(BehaviouralComptencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
