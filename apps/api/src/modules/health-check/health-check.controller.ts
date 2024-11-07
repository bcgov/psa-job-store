import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthCheckController {
  @Get('check')
  async checkReadiness() {
    // Perform any necessary checks here
    return { status: 'ok' };
  }

  @Get('gitsha')
  async gitsha() {
    // Perform any necessary checks here
    return {
      status: 'okk',
      version: process.env.GIT_SHA || 'development',
      timestamp: new Date().toISOString(),
    };
  }
}
