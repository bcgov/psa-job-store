#!/bin/sh

# Infinite loop to run logrotate periodically
while true; do
    /usr/sbin/logrotate /etc/logrotate.conf --state /tmp/logrotate.status
    # Sleep for a day
    sleep 86400
done
