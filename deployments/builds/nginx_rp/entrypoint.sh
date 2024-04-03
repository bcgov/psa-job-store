#!/bin/sh
# entrypoint.sh

# Export the required environment variables
export DISCOVERY CLIENT_ID CLIENT_SECRET REFRESH_SESSION_INTERVAL ACCESS_TOKEN_EXPIRES_IN

# Substitute environment variables in the NGINX configuration
envsubst '$DISCOVERY $CLIENT_ID $CLIENT_SECRET $REFRESH_SESSION_INTERVAL $ACCESS_TOKEN_EXPIRES_IN' < /etc/nginx/conf.d/nginx.serv.conf > /etc/nginx/conf.d/nginx.conf

rm /etc/nginx/conf.d/nginx.serv.conf
# Start OpenResty (NGINX)
/usr/local/openresty/bin/openresty -g 'daemon off;'
