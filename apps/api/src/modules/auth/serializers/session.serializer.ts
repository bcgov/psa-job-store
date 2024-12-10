/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { DoneCallback } from 'passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: DoneCallback) {
    done(null, user);
  }
  deserializeUser(payload: any, done: DoneCallback) {
    done(null, payload);
  }
}
