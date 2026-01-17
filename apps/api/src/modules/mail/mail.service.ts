import { Inject, Injectable } from '@nestjs/common';

import { Transporter, SendMailOptions } from 'nodemailer';
import { NODEMAILER_TRANSPORT } from './mail.constants';

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  attachments?: SendMailOptions['attachments'];
  headers?: SendMailOptions['headers'];
}

@Injectable()
export class MailService {
  constructor(
    @Inject(NODEMAILER_TRANSPORT)
    private readonly transporter: Transporter,
  ) {}

  async sendMail(params: SendEmailParams) {
    const from = params.from ?? process.env.MAIL_FROM ?? 'no-reply@example.com';
    return this.transporter.sendMail({
      from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
      attachments: params.attachments,
      headers: params.headers,
    });
  }
}
