# Use OpenResty's Alpine image as a parent image
FROM openresty/openresty:alpine

# Set working directory inside the container
WORKDIR /usr/local/openresty/nginx/conf

RUN apk add openssl

run apk add git

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

# Remove default NGINX configuration files
RUN rm -f /etc/nginx/conf.d/*

COPY nginx.conf /usr/local/openresty/nginx/conf

# Copy your custom NGINX configuration into the container
COPY nginx.serv.conf /etc/nginx/conf.d/nginx.conf
# ... (previous steps)

# Create necessary directories and set appropriate permissions

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

# Expose port 80
EXPOSE 8081

# Start OpenResty (which includes NGINX)
CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
