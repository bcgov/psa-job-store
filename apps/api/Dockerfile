# Use the official Node.js 18 image.
FROM node:18.17.0 AS base

# Create and change to the app directory.
FROM base AS builder
WORKDIR /tmp/build
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG DATABASE_URL
ARG KEYCLOAK_REALM_URL
ARG KEYCLOAK_CLIENT_ID_PRIVATE
ARG KEYCLOAK_CLIENT_ID_PUBLIC


RUN pwd
RUN test -n "$POSTGRES_DB"
RUN test -n "$POSTGRES_USER"
RUN test -n "$POSTGRES_PASSWORD"
RUN test -n "$DATABASE_URL"
RUN test -n "$KEYCLOAK_REALM_URL"
RUN test -n "$KEYCLOAK_CLIENT_ID_PRIVATE"
RUN test -n "$KEYCLOAK_CLIENT_ID_PUBLIC"


# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
COPY package*.json ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/
RUN npm ci
COPY tsconfig.json ./
COPY packages/tsconfig ./tsconfig/
COPY apps/api ./apps/api
#generates the dist folder for nest to run
RUN npm -w api run build

FROM base AS runner
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG DATABASE_URL
ARG KEYCLOAK_REALM_URL
ARG KEYCLOAK_CLIENT_ID_PRIVATE
ARG KEYCLOAK_CLIENT_ID_PUBLIC

ENV POSTGRES_DB $POSTGRES_DB
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD
ENV DATABASE_URL $DATABASE_URL
ENV KEYCLOAK_REALM_URL $KEYCLOAK_REALM_URL
ENV KEYCLOAK_CLIENT_ID_PRIVATE $KEYCLOAK_CLIENT_ID_PRIVATE
ENV KEYCLOAK_CLIENT_ID_PUBLIC $KEYCLOAK_CLIENT_ID_PUBLIC
ENV NODE_ENV "production"

WORKDIR /usr/src/api
COPY --from=builder /tmp/build ./
COPY /apps/api/start.sh ./apps/api/start.sh
COPY /apps/api/prisma ./apps/api/prisma
COPY /apps/api/package*.json ./apps/api/
# generates the prisma client
RUN npx prisma generate

# openshift runs as a different user than what docker builds with
# this fixes the issue as related to the npm cache
RUN mkdir /.npm
RUN chgrp -R 0 /.npm && chmod -R g=u /.npm

# Set execute permissions for the start.sh script.
RUN chmod +x ./start.sh

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["./start.sh"]