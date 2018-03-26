#!/usr/bin/env bash

export PATH="$PATH:./node_modules/.bin"

if [ -f './node_modules' ]; then
  yarn install
fi

for opt in "$@"; do
  case ${opt} in
    --build-only)
      DEV_BUILD_ONLY=true
      ;;
  esac
done

echo "**********OPTIONS***********"
echo "build only: ${DEV_BUILD_ONLY:-false}"
echo "****************************"

# initialize config here
export CONFIG_SERVICE_USER=${CONFIG_SERVICE_USER:-"http://localhost:3001"}
export NODE_ENV=development

# run webpack here
if [ -z "$DEV_BUILD_ONLY" ]; then
  webpack-dev-server --progress
else
  webpack --progress
fi
