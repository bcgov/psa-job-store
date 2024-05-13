FROM node:20.13.1-alpine AS base
# Create and change to the app directory.
FROM base AS builder
WORKDIR /tmp/build
ARG VITE_BACKEND_URL
ARG VITE_KEYCLOAK_REALM_URL
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REDIRECT_URL
RUN test -n "$VITE_BACKEND_URL"
RUN test -n "$VITE_KEYCLOAK_REALM_URL"
RUN test -n "$VITE_KEYCLOAK_CLIENT_ID"
RUN test -n "$VITE_KEYCLOAK_REDIRECT_URL"
# Copy application dependency manifests to the container image.
COPY package*.json ./
COPY packages ./packages
RUN ls packages
COPY apps/app/package.json ./apps/app/
RUN npm ci
COPY tsconfig.json ./
COPY apps/app ./apps/app
# build common-kit
RUN npm -w common-kit run build
#generates the dist folder for nest to run
RUN npm -w app run build
# openshift runs as a different user than what docker builds with

# this fixes the issue as related to the npm cache
RUN mkdir /.npm
RUN chgrp -R 0 /.npm && chmod -R g=u /.npm
#RUN chgrp -R 0 /usr/src/app/node_modules/ && chmod -R g=u /usr/src/app/node_modules
# Copy local code to the container image.
# Serve the app with Nginx
FROM nginx:alpine AS runner
ARG VITE_BACKEND_URL
ARG VITE_KEYCLOAK_REALM_URL
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_REDIRECT_URL
ENV VITE_KEYCLOAK_REDIRECT_URL $VITE_KEYCLOAK_REDIRECT_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL
ENV VITE_KEYCLOAK_CLIENT_ID $VITE_KEYCLOAK_CLIENT_ID
ENV VITE_KEYCLOAK_REALM_URL $VITE_KEYCLOAK_REALM_URL
COPY --from=builder /tmp/build/apps/app/dist /usr/share/nginx/html
COPY /apps/app/nginx.conf /etc/nginx/conf.d/default.conf

RUN set -x \
    && sed -i -e 's/^\(nginx:[^:]\):[0-9]*:[0-9]*:/\1:1001:0:/' /etc/passwd \
    && mkdir -p /var/cache/nginx \
    && chgrp -R 0 /var/cache/nginx && chmod -R g=u /var/cache/nginx \
    && chgrp -R 0 /var/run/ && chmod -R g=u /var/run \
    && rm /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh /docker-entrypoint.d/30-tune-worker-processes.sh

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
