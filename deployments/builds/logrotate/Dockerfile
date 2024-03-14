# Use Alpine Linux for its small size
FROM alpine:latest

# Install logrotate
RUN apk add --no-cache logrotate

# Copy logrotate configuration file
COPY logrotate.conf /etc/logrotate.d/

# Copy your logrotate script
COPY logrotate-script.sh /usr/local/bin/logrotate-script.sh
RUN chmod +x /usr/local/bin/logrotate-script.sh

# Set the script as the entrypoint
ENTRYPOINT ["/usr/local/bin/logrotate-script.sh"]
