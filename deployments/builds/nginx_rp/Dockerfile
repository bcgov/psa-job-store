# Use OpenResty's Alpine image as a parent image
FROM openresty/openresty:alpine

# Declare environment variables (optionally set default values)
ENV DISCOVERY=$KEYCLOAK_REALM_URL
ENV CLIENT_ID=$KEYCLOAK_CLIENT_ID_PRIVATE
ENV CLIENT_SECRET=$KEYCLOAK_CLIENT_SECRET
ENV REFRESH_SESSION_INTERVAL=$REFRESH_SESSION_INTERVAL
ENV ACCESS_TOKEN_EXPIRES_IN=$ACCESS_TOKEN_EXPIRES_IN

# Set working directory inside the container
WORKDIR /usr/local/openresty/nginx/conf

RUN apk add openssl

RUN apk add git

RUN apk add ca-certificates

RUN update-ca-certificates

# Install dependencies for building LuaRocks
RUN apk add build-base curl unzip

# Install LuaRocks from source
ENV LUAROCKS_VERSION=3.8.0
RUN curl -fSL https://luarocks.org/releases/luarocks-${LUAROCKS_VERSION}.tar.gz -o luarocks.tar.gz \
    && tar -zxvf luarocks.tar.gz \
    && cd luarocks-${LUAROCKS_VERSION} \
    && ./configure --with-lua=/usr/local/openresty/luajit \
    && make \
    && make install \
    && cd / \
    && rm -rf luarocks-${LUAROCKS_VERSION} luarocks.tar.gz

# Install lua-resty-openidc
RUN luarocks install lua-resty-http
RUN luarocks install lua-resty-session
RUN luarocks install lua-resty-jwt
RUN luarocks install lua-resty-openidc

# install for envsubst
RUN apk add --no-cache gettext

# Remove default NGINX configuration files
RUN rm -f /etc/nginx/conf.d/*

COPY nginx.conf /usr/local/openresty/nginx/conf
COPY nginx.serv.conf /etc/nginx/conf.d/nginx.serv.conf


RUN mkdir -p /var/run/openresty \
    && chgrp -R 0 /var/run/openresty \
    && chmod -R g=u /var/run/openresty

RUN mkdir -p /var/run/openresty/nginx-proxy \
    && chgrp -R 0 /var/run/openresty/nginx-proxy \
    && chmod -R g=u /var/run/openresty/nginx-proxy

RUN mkdir -p /var/run/openresty/nginx-fastcgi \
    && chgrp -R 0 /var/run/openresty/nginx-fastcgi \
    && chmod -R g=u /var/run/openresty/nginx-fastcgi

RUN mkdir -p /usr/local/openresty/nginx/logs \
    && chgrp -R 0 /usr/local/openresty/nginx/logs \
    && chmod -R g=u /usr/local/openresty/nginx/logs


RUN chmod -R g=u /etc/nginx/conf.d/nginx.serv.conf
RUN touch /etc/nginx/conf.d/nginx.conf
RUN chmod -R g=u /etc/nginx/conf.d/nginx.conf

EXPOSE 8081


# Rewrite the conf file with env vars and start the server
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]