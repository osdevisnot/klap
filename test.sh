#!/usr/bin/env bash
# set -x
git clean -fdX
npm link
cd examples
for dir in $(ls)
do
	cd ${dir} && yarn install --prod --silent && klap build && rm -rf dist/*.map && cd ..
done
yarn prettier --write "examples/**/dist/*.js"
