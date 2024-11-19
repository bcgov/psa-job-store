import { Controller, Get, UseGuards } from '@nestjs/common';
import { TestEnvironmentGuard } from '../auth/guards/test-environment.guard';
import { SearchService } from '../search/search.service';

@Controller('health')
export class HealthCheckController {
  constructor(private readonly searchService: SearchService) {}

  @Get('check')
  async checkReadiness() {
    // Perform any necessary checks here
    return { status: 'ok' };
  }

  @Get('gitsha')
  async gitsha() {
    // Perform any necessary checks here
    return {
      status: 'ok',
      version: process.env.GIT_SHA || 'development',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('resetIndex')
  @UseGuards(TestEnvironmentGuard)
  async resetIndex() {
    await this.searchService.resetIndex();
    return {
      status: 'ok',
    };
  }
}
