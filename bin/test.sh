#!/usr/bin/env bash

TEST_MODE="test"
TEST_FILE=

for opt in "$@"; do
  case ${opt} in
    --mode=*)
      TEST_MODE=${opt#*=}
      ;;
    *)
      TEST_FILE="${TEST_FILE} ${opt}"
  esac
done

export PATH="$PATH:./node_modules/.bin"
export BABEL_ENV="test"

if [ "$TEST_MODE" == "cover" ]; then
  nyc --reporter=lcov --require babel-core/register mocha --require src/test/core.js --recursive "./src/**/*.test.{js,jsx}"
  nyc report
elif [ "$TEST_MODE" == "watch" ]; then
  mocha ----require babel-core/register --require ./src/test/core.js --recursive "./src/**/*.test.{js,jsx}" --watch
elif [ "$TEST_MODE" == "only" ]; then
  mocha --require babel-core/register --require ./src/test/core.js $TEST_FILE
else
  mocha --require babel-core/register --require ./src/test/core.js --recursive "./src/**/*.test.{js,jsx}"
fi
