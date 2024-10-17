import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const X_REQUEST_ID_HEADER = 'x-request-id';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const operationName = req.body && req.body.operationName ? req.body.operationName : '';
    console.log(
      new Date().toISOString().slice(11, -1) + ' Setting request ID for: ' + req.url + ' Operation: ' + operationName,
    );
    const requestId = uuidv4();

    req.headers[X_REQUEST_ID_HEADER] = requestId;
    res.setHeader(X_REQUEST_ID_HEADER, requestId);

    console.log(new Date().toISOString().slice(11, -1) + ' ' + 'Setting request ID done');
    next();
    console.log(new Date().toISOString().slice(11, -1) + ' ' + 'Setting request ID done 2');
  }
}
