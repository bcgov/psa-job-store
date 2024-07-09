import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakResolver } from './keycloak.resolver';

describe('KeycloakResolver', () => {
  let resolver: KeycloakResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakResolver],
    }).compile();

    resolver = module.get<KeycloakResolver>(KeycloakResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
