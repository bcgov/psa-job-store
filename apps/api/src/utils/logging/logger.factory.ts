import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

export const loggerFactory = (config: ConfigService) => {
  const NODE_ENV = config.get('NODE_ENV');
  let transport;

  if (NODE_ENV !== 'production') {
    // In development, log to the console
    transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    };
    // transport = {
    //   target: 'pino/file',
    //   options: { destination: 'tmp/log/api.log' },
    // };
  } else {
    // In production, log to a file
    transport = {
      target: 'pino/file',
      options: { destination: '/tmp/log/api.log' },
    };
  }
  return {
    pinoHttp: {
      genReqId: (req, res) => {
        const existingId = req.id ?? req.headers['x-request-id'];
        if (existingId) return existingId;

        const id = uuidv4();
        res.setHeader('X-Request-Id', id);
        return id;
      },
      level: NODE_ENV !== 'production' ? 'debug' : 'info',
      useLevelLabels: true,
      transport: transport,
      formatters: {
        level(label) {
          return { severity: label };
        },
        log: (obj) => {
          return {
            ...obj,
            time: new Date().toISOString(), // Add timestamp in ISO format
            msg: obj.msg,
          };
        },
      },
      serializers: {
        req: (req) => {
          return {
            id: req.id,
            // user, auth.user
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.params,
            origin: req.headers.origin,
            // Add any other request-related information you need
          };
        },
        res: (res) => {
          return {
            statusCode: res.statusCode,
            // Add any other response-related information you need
          };
        },
      },
    },
  };
};
