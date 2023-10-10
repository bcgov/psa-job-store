import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { sign } from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { KeycloakStrategy } from './keycloak.strategy';

// Define the mocked type for the AuthService
type MockedAuthService = {
  [K in keyof AuthService]: jest.Mock;
};

describe('KeycloakStrategy', () => {
  let strategy: KeycloakStrategy;
  let mockAuthService: MockedAuthService;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockAuthService = {
      getKeycloakPublicKey: jest.fn().mockResolvedValue('mock-public-key'),
      getExpectedKeyCloakClientIds: jest.fn().mockReturnValue(['some-client-id']),
      getUserFromPayload: jest.fn(),
    } as MockedAuthService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakStrategy, { provide: AuthService, useValue: mockAuthService }],
    }).compile();

    strategy = module.get<KeycloakStrategy>(KeycloakStrategy);
  });

  it('should validate and process a valid JWT correctly', async () => {
    const validPayload = {
      sub: '1234567890',
      name: 'John Doe',
      aud: 'some-client-id',
      // ... other JWT data
    };

    const validToken = sign(validPayload, 'test-secret');

    mockAuthService.getKeycloakPublicKey.mockResolvedValue('test-secret');
    mockAuthService.getExpectedKeyCloakClientIds.mockReturnValue(['some-client-id']);
    mockAuthService.getUserFromPayload.mockResolvedValue(validPayload);

    const done = jest.fn();

    await strategy.validate(validToken, done);

    expect(done).toHaveBeenCalledWith(null, validPayload);
  });

  it('should throw UnauthorizedException on expired token', async () => {
    const expiredPayload = {
      sub: '1234567890',
      name: 'John Doe',
      aud: 'some-client-id',
      exp: Math.floor(Date.now() / 1000) - 60, // this token expired 1 minute ago
      // ... other JWT data
    };

    const expiredToken = sign(expiredPayload, 'test-secret');

    mockAuthService.getKeycloakPublicKey.mockResolvedValue('test-secret');
    mockAuthService.getExpectedKeyCloakClientIds.mockReturnValue(['some-client-id']);

    const done = jest.fn();

    await expect(strategy.validate(expiredToken, done)).rejects.toThrow(UnauthorizedException);
  });

  it('should rethrow other errors', async () => {
    const malformedToken = 'malformed-jwt-token'; // this isn't a real JWT

    mockAuthService.getKeycloakPublicKey.mockResolvedValue('test-secret');
    mockAuthService.getExpectedKeyCloakClientIds.mockReturnValue(['some-client-id']);

    const done = jest.fn();

    await expect(strategy.validate(malformedToken, done)).rejects.toThrowError(); // this will throw the default JsonWebTokenError due to a malformed JWT
  });

  it('should throw error on audience mismatch', async () => {
    const payloadWithWrongAudience = {
      sub: '1234567890',
      name: 'John Doe',
      aud: 'wrong-client-id',
    };

    const token = sign(payloadWithWrongAudience, 'test-secret');

    mockAuthService.getKeycloakPublicKey.mockResolvedValue('test-secret');
    mockAuthService.getExpectedKeyCloakClientIds.mockReturnValue(['some-client-id']);

    const done = jest.fn();

    await expect(strategy.validate(token, done)).rejects.toThrowError();
  });

  it('should throw error on invalid public key', async () => {
    const validPayload = {
      sub: '1234567890',
      name: 'John Doe',
      aud: 'some-client-id',
    };

    const validToken = sign(validPayload, 'test-secret');

    mockAuthService.getKeycloakPublicKey.mockResolvedValue('wrong-key');
    mockAuthService.getExpectedKeyCloakClientIds.mockReturnValue(['some-client-id']);

    const done = jest.fn();

    await expect(strategy.validate(validToken, done)).rejects.toThrowError();
  });

  it('should throw error if getUserFromPayload throws error', async () => {
    const validPayload = {
      sub: '1234567890',
      name: 'John Doe',
      aud: 'some-client-id',
    };

    const validToken = sign(validPayload, 'test-secret');

    mockAuthService.getKeycloakPublicKey.mockResolvedValue('test-secret');
    mockAuthService.getExpectedKeyCloakClientIds.mockReturnValue(['some-client-id']);
    mockAuthService.getUserFromPayload.mockRejectedValue(new Error('Failed to get user'));

    const done = jest.fn();

    await expect(strategy.validate(validToken, done)).rejects.toThrowError('Failed to get user');
  });
});
