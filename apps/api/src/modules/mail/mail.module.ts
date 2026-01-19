import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { NODEMAILER_TRANSPORT } from './mail.constants';

import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Module({
  providers: [
    {
      provide: NODEMAILER_TRANSPORT,
      useFactory: (config: ConfigService): Transporter => {
        return nodemailer.createTransport({
          host: config.get('SMTP_HOST'),
          port: parseInt(config.get('SMTP_PORT') ?? '25', 10),
          secure: false,
          requireTLS: (config.get('SMTP_HOST') ?? 'localhost').indexOf('localhost') < 0, // only use TLS for Gov SMTP
          tls: {
            rejectUnauthorized: false,
          },
        });
      },
      inject: [ConfigService],
    },
    MailService,
  ],
  exports: [MailService, NODEMAILER_TRANSPORT],
})
export class MailModule {}
