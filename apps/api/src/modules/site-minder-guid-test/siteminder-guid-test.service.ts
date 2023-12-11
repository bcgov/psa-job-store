import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@ObjectType()
export class TestApiResponse {
  @Field()
  info: string;

  @Field(() => String)
  headers: string; // JSON string

  @Field()
  method: string;

  @Field()
  url: string;
}

@Injectable()
export class SiteMinderGuidTestApiService {
  constructor(private httpService: HttpService) {}

  async sendRequestWithUserGuid(req: Request, url: string, method: string, data?: any) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token not found');
    }

    const decodedToken = jwt.decode(token) as any;
    const idirUserGuid = decodedToken?.idir_user_guid;
    if (!idirUserGuid) {
      throw new Error('IDIR User GUID not found in token');
    }

    const config = {
      headers: { 'idir-user-guid': idirUserGuid },
      method,
      url,
      data,
    };

    return {
      info: 'This is the request that would be sent to external provider',
      headers: JSON.stringify(config.headers), // Convert to JSON string
      method: config.method,
      url: config.url,
    };
    // return this.httpService.axiosRef(config);
  }
}
