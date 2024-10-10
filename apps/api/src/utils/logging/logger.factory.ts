import * as jwt from 'jsonwebtoken';
import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';
import { guidToUuid } from '../guid-to-uuid.util';

export const loggerFactory = () => {
  const NODE_ENV = process.env.NODE_ENV;
  let transports;

  if (NODE_ENV !== 'production') {
    // In development, log to the console
    // In development, log to the console
    transports = [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    ];
  } else {
    // In production, log to both console and file
    transports = [
      {
        target: 'pino/file',
        options: { destination: '/tmp/log/api.log' },
      },
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          destination: pino.destination(1), // 1 is stdout
        },
      },
    ];
  }
  return {
    genReqId: (req, res) => {
      const existingId = req.id ?? req.headers['x-request-id'];
      if (existingId) return existingId;

      const id = uuidv4();
      res.setHeader('X-Request-Id', id);
      return id;
    },
    level: NODE_ENV !== 'production' ? 'debug' : 'info',
    useLevelLabels: true,
    transports: transports,
    formatters: {
      level(label) {
        return { severity: label };
      },
      log: (obj) => {
        // return null;
        return {
          ...obj,
          time: new Date().toISOString(), // Add timestamp in ISO format
          msg: obj.msg,
        };
      },
    },
    serializers: {
      req: (req) => {
        // Authentication runs after this block, so we can't use req.user here
        // Instead, we'll extract the user from the Authorization header by decoding the JWT without verification
        // and pass it to the logger as user_unverified
        // related issue: https://github.com/iamolegga/nestjs-pino/issues/433
        //
        // if necessary, you can use the authService to verify the JWT
        // we can't have async code here, so would need to create a sync version of
        // getKeycloakPublicKey function and replace globalLogger functionality

        let uuid = null;

        try {
          const authHeader = req.headers.authorization;
          const payload = authHeader.split(' ')[1];
          const decodedToken = jwt.decode(payload);
          uuid = guidToUuid((decodedToken as any).idir_user_guid);
        } catch (error) {}

        // Verification code if needed

        // if (authHeader) {
        //   const payload = authHeader.split(' ')[1];

        //   // Start the async operation
        //   authService
        //     .getKeycloakPublicKey()
        //     .then((publicKey) => {
        //       const expectedAudiences = authService.getExpectedKeyCloakClientIds();
        //       const expectedIssuer = authService.getExpectedKeyCloakIssuer();

        //       try {
        //         decodedToken = verifyJwt(payload, publicKey, {
        //           complete: false,
        //           ignoreExpiration: false,
        //           audience: expectedAudiences,
        //           issuer: expectedIssuer,
        //           algorithms: ['RS256'],
        //         }) as JwtPayload;
        //         console.log('decodedToken: ', decodedToken);
        //       } catch (error) {
        //         console.error('Error verifying JWT:', error);
        //       }
        //     })
        //     .catch((error) => {
        //       console.error('Error getting Keycloak public key:', error);
        //     });
        // }

        return {
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          origin: req.headers.origin,
          user_unverified: uuid,
        };
      },
      res: (res) => {
        return {
          statusCode: res.statusCode,
          // Add any other response-related information you need
        };
      },
    },
  };
};

// Use this function for both nestjs-pino and the global logger
export const loggerOptions = loggerFactory();

// Creating a global logger instance with the same options
export const globalLogger = pino(loggerOptions as any);
