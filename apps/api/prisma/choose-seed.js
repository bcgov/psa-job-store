// prisma/chooseSeed.ts
import { execSync } from 'node:child_process';
import path from 'node:path';

// Default seed file
let seedFile = 'prisma/run-e2e-seed.ts';

// Override seed file based on an environment variable
if (process.env.SEED_FILE) {
  seedFile = process.env.SEED_FILE;
}

// Execute the seed file
// console.log(`Running seed: ${seedFile}`);
execSync(`ts-node ${path.resolve(seedFile)}`, { stdio: 'inherit' });
