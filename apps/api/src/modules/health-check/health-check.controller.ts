/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { exec } from 'child_process';
import { TestEnvironmentGuard } from '../auth/guards/test-environment.guard';
import { SearchService } from '../search/search.service';

import * as fs from 'fs';
import { promisify } from 'util';
import { E2EAuthGuard } from '../auth/guards/e2e-auth.guard';

const execAsync = promisify(exec);

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

  @Get('dumpCreateSchema')
  @UseGuards(E2EAuthGuard)
  async dumpCreateSchema() {
    try {
      const tempFile = '/tmp/log/schema.sql';

      // Generate the schema SQL file
      const { stderr } = await execAsync(
        `npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > ${tempFile}`,
      );

      if (stderr) {
        throw new Error(`Schema dump failed....: ${stderr}`);
      }

      // Read the generated file
      const schemaContent = await fs.promises.readFile(tempFile, 'utf8');

      // Clean up the temporary file
      await fs.promises.unlink(tempFile);

      return {
        status: 'ok',
        schema: schemaContent,
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error?.message,
      };
    }
  }
}
