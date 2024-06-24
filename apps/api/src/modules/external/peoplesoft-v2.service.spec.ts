import { Test, TestingModule } from '@nestjs/testing';
import { PeoplesoftV2Service } from './peoplesoft-v2.service';

describe('PeoplesoftV2Service', () => {
  let service: PeoplesoftV2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeoplesoftV2Service],
    }).compile();

    service = module.get<PeoplesoftV2Service>(PeoplesoftV2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
