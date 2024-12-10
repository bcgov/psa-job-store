import { PGlite } from '@electric-sql/pglite';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPGlite } from 'pglite-prisma-adapter';
import { seed } from '../../utils/e2e-test-data-seed';
import { ExtendedPrismaClient } from './extended-prisma-client.impl';

@Injectable()
export class PGLitePrismaService extends ExtendedPrismaClient implements OnModuleInit {
  private static instance: PGLitePrismaService;
  private pglite: PGlite;

  static getInstance() // eventsService: EventsService
  : PGLitePrismaService {
    if (!PGLitePrismaService.instance) {
      PGLitePrismaService.instance = new PGLitePrismaService(); // eventsService
    }
    return PGLitePrismaService.instance;
  }

  constructor() {
    // private readonly eventsService: EventsService
    console.log('creating prisma service: ', process.env.DATABASE_URL);
    const pglite = new PGlite(process.env.DATABASE_URL);
    const adapter = new PrismaPGlite(pglite);

    super({
      adapter,
      // log: ['query', 'error', 'warn'], // Add logging
    });

    this.pglite = pglite;
    PGLitePrismaService.instance = this;
  }

  async onModuleInit() {
    // console.log('onModuleInit TEST');
    // const user = await this.user.create({
    //   data: {
    //     email: 'test@prisma.io',
    //     name: 'test',
    //   },
    // });
    // console.log('TEST Current users:', user);

    // // END TEST

    console.log('connecting to database...');
    await this.$connect();

    console.log('reading schema file..');

    // console.log('process.env.DB_SCHEMA is..: ');
    // console.log(process.env.DB_SCHEMA);

    const schema = process.env.DB_SCHEMA.replace(/\\n/g, '\n');

    const sqlString =
      //(await fs.promises.readFile('/tmp/log/schema.sql', 'utf8')) +
      schema +
      `
        CREATE OR REPLACE VIEW public.current_job_profiles
     AS
     SELECT jp.id,
        jp.all_organizations,
        jp.all_reports_to,
        jp.role_id,
        jp.role_type_id,
        jp.state,
        jp.type,
        jp.updated_at,
        jp.owner_id,
        jp.program_overview,
        jp.review_required,
        jp.title,
        jp.number,
        jp.overview,
        jp.accountabilities,
        jp.education,
        jp.job_experience,
        jp.professional_registration_requirements,
        jp.preferences,
        jp.knowledge_skills_abilities,
        jp.willingness_statements,
        jp.security_screenings,
        jp.total_comp_create_form_misc,
        jp.optional_requirements,
        jp.is_archived,
        jp.updated_by_id,
        jp.published_by_id,
        jp.valid_from,
        jp.valid_to,
        jp.version,
        jp.created_at,
        jp.published_at,
        jp.views,
        jp.context
       FROM job_profile jp
         JOIN ( SELECT job_profile.id,
                max(job_profile.version) AS max_version
               FROM job_profile
              GROUP BY job_profile.id) current_table ON jp.id = current_table.id AND jp.version = current_table.max_version;
        `;

    // Split the string into individual commands and filter out empty ones
    // First remove all comments
    const withoutComments = sqlString
      .split('\n')
      .filter((line) => !line.trim().startsWith('--'))
      .join('\n');

    // Then split by semicolon and clean up
    const commands = withoutComments
      .split(';')
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd.length > 0);

    // Execute each command in a transaction
    await this.$transaction(async (tx) => {
      for (const command of commands) {
        await tx.$executeRawUnsafe(command);
      }
    });

    await seed(this);

    // reset index
    // await this.searchService.resetIndex();
    // to prevent circular depencency

    // Reset should work because it fires on application bootstrap in searchService
    // console.log('emitting search:resetIndex');
    // const promise = this.eventsService.waitFor('search:resetIndex');
    // await this.eventsService.emit('search:resetIndex', null);
    // await promise;
    // console.log('emitting search:resetIndex done');

    // console.log('classifications now are: ');
    // const classifications = await this.classification.findMany();
    // console.log(classifications);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
