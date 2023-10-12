#!/bin/sh
pwd
# Run migrations
npx prisma db push --schema='prisma/schema.prisma' --skip-generate 
# Start the application
npm run start:prod
