import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { sign } from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { KeycloakStrategy } from './keycloak.strategy';

// Define the mocked type for the AuthService
type MockedAuthService = {
  [K in keyof AuthService]: jest.Mock;
};

jest.mock('../../user/user.service', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    syncUsers: jest.fn(),
  })),
}));

describe('KeycloakStrategy', () => {
  let strategy: KeycloakStrategy;
  let mockAuthService: MockedAuthService;
  const testPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7VJTUt9Us8cKj
MzEfYyjiWA4R4/M2bS1GB4t7NXp98C3SC6dVMvDuictGeurT8jNbvJZHtCSuYEvu
NMoSfm76oqFvAp8Gy0iz5sxjZmSnXyCdPEovGhLa0VzMaQ8s+CLOyS56YyCFGeJZ
qgtzJ6GR3eqoYSW9b9UMvkBpZODSctWSNGj3P7jRFDO5VoTwCQAWbFnOjDfH5Ulg
p2PKSQnSJP3AJLQNFNe7br1XbrhV//eO+t51mIpGSDCUv3E0DDFcWDTH9cXDTTlR
ZVEiR2BwpZOOkE/Z0/BVnhZYL71oZV34bKfWjQIt6V/isSMahdsAASACp4ZTGtwi
VuNd9tybAgMBAAECggEBAKTmjaS6tkK8BlPXClTQ2vpz/N6uxDeS35mXpqasqskV
laAidgg/sWqpjXDbXr93otIMLlWsM+X0CqMDgSXKejLS2jx4GDjI1ZTXg++0AMJ8
sJ74pWzVDOfmCEQ/7wXs3+cbnXhKriO8Z036q92Qc1+N87SI38nkGa0ABH9CN83H
mQqt4fB7UdHzuIRe/me2PGhIq5ZBzj6h3BpoPGzEP+x3l9YmK8t/1cN0pqI+dQwY
dgfGjackLu/2qH80MCF7IyQaseZUOJyKrCLtSD/Iixv/hzDEUPfOCjFDgTpzf3cw
ta8+oE4wHCo1iI1/4TlPkwmXx4qSXtmw4aQPz7IDQvECgYEA8KNThCO2gsC2I9PQ
DM/8Cw0O983WCDY+oi+7JPiNAJwv5DYBqEZB1QYdj06YD16XlC/HAZMsMku1na2T
N0driwenQQWzoev3g2S7gRDoS/FCJSI3jJ+kjgtaA7Qmzlgk1TxODN+G1H91HW7t
0l7VnL27IWyYo2qRRK3jzxqUiPUCgYEAx0oQs2reBQGMVZnApD1jeq7n4MvNLcPv
t8b/eU9iUv6Y4Mj0Suo/AU8lYZXm8ubbqAlwz2VSVunD2tOplHyMUrtCtObAfVDU
AhCndKaA9gApgfb3xw1IKbuQ1u4IF1FJl3VtumfQn//LiH1B3rXhcdyo3/vIttEk
48RakUKClU8CgYEAzV7W3COOlDDcQd935DdtKBFRAPRPAlspQUnzMi5eSHMD/ISL
DY5IiQHbIH83D4bvXq0X7qQoSBSNP7Dvv3HYuqMhf0DaegrlBuJllFVVq9qPVRnK
xt1Il2HgxOBvbhOT+9in1BzA+YJ99UzC85O0Qz06A+CmtHEy4aZ2kj5hHjECgYEA
mNS4+A8Fkss8Js1RieK2LniBxMgmYml3pfVLKGnzmng7H2+cwPLhPIzIuwytXywh
2bzbsYEfYx3EoEVgMEpPhoarQnYPukrJO4gwE2o5Te6T5mJSZGlQJQj9q4ZB2Dfz
et6INsK0oG8XVGXSpQvQh3RUYekCZQkBBFcpqWpbIEsCgYAnM3DQf3FJoSnXaMhr
VBIovic5l0xFkEHskAjFTevO86Fsz1C2aSeRKSqGFoOQ0tmJzBEs1R6KqnHInicD
TQrKhArgLXX4v3CddjfTRJkFWDbE/CkvKZNOrcf1nhaGCPspRJj2KUkj1Fhl9Cnc
dn/RsYEONbwQSjIfMPkvxF+8HQ==
-----END PRIVATE KEY-----`;

  const testPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
mwIDAQAB
-----END PUBLIC KEY-----`;

  beforeAll(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    mockAuthService = {
      getKeycloakPublicKey: jest.fn().mockResolvedValue(testPublicKey),
      getExpectedKeyCloakClientIds: jest.fn().mockReturnValue(['some-client-id']),
      getUserFromPayload: jest.fn(),
      getExpectedKeyCloakIssuer: jest.fn().mockReturnValue('some-issuer'),
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
      iss: 'some-issuer',
      exp: Math.floor(Date.now() / 1000) + 3600, // Set expiration 1 hour from now
    };

    const validToken = sign(validPayload, testPrivateKey, {
      algorithm: 'RS256',
    });

    mockAuthService.getUserFromPayload.mockResolvedValue(validPayload);

    const done = jest.fn();

    await strategy.validate(validToken, done);

    expect(done).toHaveBeenCalledWith(null, validPayload);
    expect(mockAuthService.getUserFromPayload).toHaveBeenCalledWith(expect.objectContaining(validPayload));
  });

  it('should throw UnauthorizedException on expired token', async () => {
    const expiredPayload = {
      sub: '1234567890',
      name: 'John Doe',
      aud: 'some-client-id',
      exp: Math.floor(Date.now() / 1000) - 60, // this token expired 1 minute ago
      // ... other JWT data
    };

    const expiredToken = sign(expiredPayload, testPrivateKey, {
      algorithm: 'RS256',
    });

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
      iss: 'some-issuer',
    };

    const validToken = sign(validPayload, testPrivateKey, {
      algorithm: 'RS256',
    });

    mockAuthService.getUserFromPayload.mockRejectedValue(new Error('Failed to get user'));

    const done = jest.fn();

    await expect(strategy.validate(validToken, done)).rejects.toThrow('Failed to get user');
  });
});
