import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';

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
    customLogLevel: function (req, res) {
      // filter out /health/check requests from logs
      if (req.url === '/health/check') {
        return 'silent';
      }

      return 'info';
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
                options: {
                  destination: '/tmp/log/api.log',
                },
                level: 'info',
              },
            ]
          : []),
      ],
    },
    serializers: {
      req: (req) => {
        let uuid = null;
        try {
          uuid = req?.raw?.user?.id;
        } catch (error) {
          uuid = null;
        }

        // const query = req.body?.query || '';
        // const queryToLog = query.trim().startsWith('mutation SubmitPositionRequest')
        //   ? '[REDACTED]'
        //   : req.query;

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
