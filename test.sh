#!/usr/bin/env bash

git clean -fdX
npm link
cd examples
for dir in $(ls)
do
	cd ${dir} && klap build && rm -rf dist/*.map && cd ..
done
yarn prettier --write "examples/**/dist/*.js"

