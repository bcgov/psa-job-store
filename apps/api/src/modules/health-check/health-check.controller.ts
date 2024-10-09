import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthCheckController {
  @Get('check')
  async checkReadiness() {
    // Perform any necessary checks here
    return { status: 'ok' };
  }
}
