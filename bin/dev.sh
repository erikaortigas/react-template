#!/usr/bin/env bash

export PATH="$PATH:./node_modules/.bin"

export DEV_BUNDLER=${DEV_BUNDLER:-webpack}

if [ -f './node_modules' ]; then
  yarn install
fi

for opt in "$@"; do
  case ${opt} in
    --build-only)
      export DEV_BUILD_ONLY=true
      ;;
    --webpack)
      export DEV_BUNDLER="webpack"
      ;;
  esac
done

echo "**********OPTIONS***********"
echo "build only: ${DEV_BUILD_ONLY:-false}"
echo "bundler:    ${DEV_BUNDLER}"
echo "****************************"

# initialize config here
export CONFIG_SERVICE_USER=${CONFIG_SERVICE_USER:-"http://localhost:3001"}
export NODE_ENV=development

watchMode() {
  if [ "$DEV_BUNDLER" == "parcel" ]; then
    parcel -p 8080 src/static/development.html
  else
    webpack-dev-server --progress
  fi
}

buildMode() {
  if [ "$DEV_BUNDLER" == "parcel" ]; then
    parcel build src/static/development.html -d dist
  else
    webpack --progress
  fi
}

# run webpack here
if [ -z "$DEV_BUILD_ONLY" ]; then
  watchMode
else
  buildMode
fi
