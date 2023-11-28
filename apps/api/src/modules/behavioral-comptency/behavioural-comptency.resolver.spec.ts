import { Test, TestingModule } from '@nestjs/testing';
import { BehaviouralComptencyResolver } from './behavioural-comptency.resolver';

describe('BehaviouralComptencyResolver', () => {
  let resolver: BehaviouralComptencyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BehaviouralComptencyResolver],
    }).compile();

    resolver = module.get<BehaviouralComptencyResolver>(BehaviouralComptencyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
