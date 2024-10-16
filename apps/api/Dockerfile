FROM node:20.13.1-alpine AS base

# Create and change to the app directory.
FROM base AS builder
WORKDIR /tmp/build
ARG SSO_ENVIRONMENT
ARG SSO_INTEGRATION_ID
ARG CSS_API_CLIENT_ID
ARG CSS_API_CLIENT_SECRET
ARG KEYCLOAK_REALM_URL
ARG KEYCLOAK_CLIENT_ID_PRIVATE
ARG KEYCLOAK_CLIENT_ID_PUBLIC

RUN test -n "$SSO_ENVIRONMENT"
RUN test -n "$SSO_INTEGRATION_ID"
RUN test -n "$CSS_API_CLIENT_ID"
RUN test -n "$CSS_API_CLIENT_SECRET"
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
# generates the prisma client
RUN npx -w api prisma generate
# build common-kit
RUN npm -w common-kit run build
#generates the dist folder for nest to run
RUN npm -w api run build

FROM base AS runner
ARG SSO_ENVIRONMENT
ARG SSO_INTEGRATION_ID
ARG CSS_API_CLIENT_ID
ARG CSS_API_CLIENT_SECRET
ARG KEYCLOAK_REALM_URL
ARG KEYCLOAK_CLIENT_ID_PRIVATE
ARG KEYCLOAK_CLIENT_ID_PUBLIC

ENV SSO_ENVIRONMENT $SSO_ENVIRONMENT
ENV SSO_INTEGRATION_ID $SSO_INTEGRATION_ID
ENV CSS_API_CLIENT_ID $CSS_API_CLIENT_ID
ENV CSS_API_CLIENT_SECRET $CSS_API_CLIENT_SECRET
ENV KEYCLOAK_REALM_URL $KEYCLOAK_REALM_URL
ENV KEYCLOAK_CLIENT_ID_PRIVATE $KEYCLOAK_CLIENT_ID_PRIVATE
ENV KEYCLOAK_CLIENT_ID_PUBLIC $KEYCLOAK_CLIENT_ID_PUBLIC
ENV NODE_ENV "production"

WORKDIR /usr/src
COPY --from=builder /tmp/build ./
COPY /apps/api/prisma ./apps/api/prisma
COPY /apps/api/package*.json ./apps/api/

WORKDIR /usr/src/apps/api/

# openshift runs as a different user than what docker builds with
# this fixes the issue as related to the npm cache
RUN mkdir /.npm
RUN chgrp -R 0 /.npm && chmod -R g=u /.npm

RUN mkdir -p /tmp/log

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm","run","start:prod"]