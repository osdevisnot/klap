#!/usr/bin/env bash
# set -x

git clean -fdX

npm install

npm run build

cd examples

for dir in minimal scaffold scaffold-typescript react-component react-typescript react-sc-typescript dynamic-imports
do
	cd ${dir} && klap build && rm -rf dist/*.map && cd ..
done

prettier --write **/dist/*.js

