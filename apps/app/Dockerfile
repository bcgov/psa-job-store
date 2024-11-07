FROM node:20.17.0-alpine AS base

FROM base AS builder
WORKDIR /tmp/build

# Add Git SHA as build argument
ARG GITHUB_SHA
ARG VITE_BACKEND_URL
ARG VITE_TEST_ENV
ARG VITE_KEYCLOAK_REALM_URL
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REDIRECT_URL
ARG VITE_SUPPORT_EMAIL
ARG VITE_ENV

# Validate required build args
RUN test -n "$VITE_BACKEND_URL"
RUN test -n "$VITE_TEST_ENV"
RUN test -n "$VITE_KEYCLOAK_REALM_URL"
RUN test -n "$VITE_KEYCLOAK_CLIENT_ID"
RUN test -n "$VITE_KEYCLOAK_REDIRECT_URL"
RUN test -n "$VITE_SUPPORT_EMAIL"
RUN test -n "$VITE_ENV"

# Copy application dependency manifests to the container image.
COPY package*.json ./
COPY packages ./packages
RUN ls packages
COPY apps/app/package.json ./apps/app/
RUN npm ci

COPY tsconfig.json ./
COPY apps/app ./apps/app

# Pass Git SHA to the build process
ENV GITHUB_SHA=${GITHUB_SHA:-development}

# build common-kit
RUN npm -w common-kit run build

# Build app with version information
RUN npm -w app run build

# Fix npm cache permissions
RUN mkdir /.npm
RUN chgrp -R 0 /.npm && chmod -R g=u /.npm

FROM nginx:alpine AS runner

# Pass through all environment variables
ARG GITHUB_SHA
ARG VITE_BACKEND_URL
ARG VITE_TEST_ENV
ARG VITE_KEYCLOAK_REALM_URL
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REDIRECT_URL
ARG VITE_SUPPORT_EMAIL
ARG VITE_ENV

ENV GITHUB_SHA ${GITHUB_SHA:-development}
ENV VITE_KEYCLOAK_REDIRECT_URL $VITE_KEYCLOAK_REDIRECT_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL
ENV VITE_TEST_ENV $VITE_TEST_ENV
ENV VITE_KEYCLOAK_CLIENT_ID $VITE_KEYCLOAK_CLIENT_ID
ENV VITE_KEYCLOAK_REALM_URL $VITE_KEYCLOAK_REALM_URL
ENV VITE_SUPPORT_EMAIL $VITE_SUPPORT_EMAIL
ENV VITE_ENV $VITE_ENV

# Copy built files and nginx configuration
COPY --from=builder /tmp/build/apps/app/dist /usr/share/nginx/html
COPY /apps/app/nginx.conf /etc/nginx/conf.d/default.conf

# Set up permissions for OpenShift
RUN set -x \
    && sed -i -e 's/^\(nginx:[^:]\):[0-9]*:[0-9]*:/\1:1001:0:/' /etc/passwd \
    && mkdir -p /var/cache/nginx \
    && chgrp -R 0 /var/cache/nginx && chmod -R g=u /var/cache/nginx \
    && chgrp -R 0 /var/run/ && chmod -R g=u /var/run \
    && rm /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh /docker-entrypoint.d/30-tune-worker-processes.sh

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]