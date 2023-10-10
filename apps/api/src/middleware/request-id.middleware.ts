import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const X_REQUEST_ID_HEADER = 'x-request-id';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();

    req.headers[X_REQUEST_ID_HEADER] = requestId;
    res.setHeader(X_REQUEST_ID_HEADER, requestId);

    next();
  }
}
