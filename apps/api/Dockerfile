FROM node:22.11.0-alpine AS base

FROM base AS builder
WORKDIR /tmp/build

# Add Git SHA as build argument
ARG GITHUB_SHA
ARG SSO_ENVIRONMENT
ARG SSO_INTEGRATION_ID
ARG CSS_API_CLIENT_ID
ARG CSS_API_CLIENT_SECRET
ARG SESSION_SECRET
ARG REACT_APP_URL
ARG KEYCLOAK_REALM_URL
ARG KEYCLOAK_CALLBACK_URL
ARG KEYCLOAK_LOGOUT_REDIRECT_URL
ARG KEYCLOAK_CLIENT_ID
ARG KEYCLOAK_CLIENT_SECRET

# Copy application dependency manifests to the container image.
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
# generates the dist folder for nest to run
RUN npm -w api run build

FROM base AS runner
ARG GITHUB_SHA
ARG SSO_ENVIRONMENT
ARG SSO_INTEGRATION_ID
ARG CSS_API_CLIENT_ID
ARG CSS_API_CLIENT_SECRET
ARG SESSION_SECRET
ARG REACT_APP_URL
ARG KEYCLOAK_REALM_URL
ARG KEYCLOAK_CALLBACK_URL
ARG KEYCLOAK_LOGOUT_REDIRECT_URL
ARG KEYCLOAK_CLIENT_ID
ARG KEYCLOAK_CLIENT_SECRET

# Pass GIT_SHA to the runtime environment
ENV GIT_SHA ${GITHUB_SHA:-development}
ENV SSO_ENVIRONMENT $SSO_ENVIRONMENT
ENV SSO_INTEGRATION_ID $SSO_INTEGRATION_ID
ENV CSS_API_CLIENT_ID $CSS_API_CLIENT_ID
ENV CSS_API_CLIENT_SECRET $CSS_API_CLIENT_SECRET
ENV SESSION_SECRET $SESSION_SECRET
ENV REACT_APP_URL $REACT_APP_URL
ENV KEYCLOAK_REALM_URL $KEYCLOAK_REALM_URL
ENV KEYCLOAK_CALLBACK_URL $KEYCLOAK_CALLBACK_URL
ENV KEYCLOAK_LOGOUT_REDIRECT_URL $KEYCLOAK_LOGOUT_REDIRECT_URL
ENV KEYCLOAK_CLIENT_ID $KEYCLOAK_CLIENT_ID
ENV KEYCLOAK_CLIENT_SECRET $KEYCLOAK_CLIENT_SECRET
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

EXPOSE 4000

# Start the application
CMD ["npm","run","start:prod"]