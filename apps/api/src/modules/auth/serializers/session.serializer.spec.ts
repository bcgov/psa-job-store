import { Test, TestingModule } from '@nestjs/testing';
import { SessionSerializer } from './session.serializer';

describe('SessionSerializer', () => {
  let service: SessionSerializer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionSerializer],
    }).compile();

    service = module.get<SessionSerializer>(SessionSerializer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
