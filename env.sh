#!/bin/sh
echo "window.API_URL=\"$API_URL\"" > /usr/share/nginx/html/config.js
exec "$@"