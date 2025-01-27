import * as jwt from 'jsonwebtoken';
import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';
import { guidToUuid } from '../guid-to-uuid.util';

interface DecodedToken {
  idir_user_guid: string;
}

export const loggerFactory = () => {
  const NODE_ENV = process.env.NODE_ENV;
  const SKIP_LOGGING = process.env.SKIP_LOGGING;

  return {
    // formatters doesn't work when using multiple transport targets,
    // so we'll use mixin instead. Note that it does cause duplication of the "time" field
    mixin(_context, level) {
      return {
        severity: pino.levels.labels[level],
        time: new Date().toISOString(),
      };
    },
    genReqId: (req, res) => {
      const existingId = req.id ?? req.headers['x-request-id'];
      if (existingId) return existingId;

      const id = uuidv4();
      res.setHeader('X-Request-Id', id);
      return id;
    },
    level: NODE_ENV !== 'production' ? 'debug' : 'info',
    useLevelLabels: true,
    // formatters: {
    //   level(label) {
    //     return { severity: label };
    //   },
    //   log: (obj) => {
    //     // return null;
    //     return {
    //       ...obj,
    //       time: new Date().toISOString(), // Add timestamp in ISO format
    //       msg: obj.msg,
    //     };
    //   },
    // },
    transport: {
      targets: [
        {
          target: 'pino-pretty', // For console output
          options: {
            colorize: true,
          },
          level: NODE_ENV !== 'production' ? 'debug' : 'info',
        },
        ...(NODE_ENV == 'production' && SKIP_LOGGING !== 'true'
          ? [
              {
                target: 'pino/file',
                options: { destination: '/tmp/log/api.log' },
                level: 'info',
              },
            ]
          : []),
      ],
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
          if (authHeader && typeof authHeader === 'string') {
            const token = authHeader.split(' ')[1];
            if (token && typeof token === 'string') {
              const decoded = jwt.decode(token);

              if (decoded && typeof decoded === 'object') {
                const decodedToken = decoded as DecodedToken;

                if (decodedToken.idir_user_guid && typeof decodedToken.idir_user_guid === 'string') {
                  // Validate the GUID format before conversion
                  const guidPattern = /^[a-fA-F0-9]{32}$/;
                  if (guidPattern.test(decodedToken.idir_user_guid)) {
                    const convertedUuid = guidToUuid(decodedToken.idir_user_guid);
                    const formatPattern =
                      /^([a-f0-9]{8})-?([a-f0-9]{4})-?([a-f0-9]{4})-?([a-f0-9]{4})-?([a-f0-9]{12})$/i;
                    uuid = formatPattern.test(convertedUuid) ? convertedUuid : 'invalid-guid-format-1';
                  } else {
                    // Log invalid GUID format
                    uuid = 'invalid-guid-format-2';
                  }
                }
              }
            }
          }
        } catch (error) {
          uuid = null;
        }

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
