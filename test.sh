#!/usr/bin/env bash
# set -x

git clean -fdX

yarn

yarn run build

cd examples

for dir in scaffold scaffold-typescript react-component react-typescript react-sc-typescript
do
	cd ${dir} && klap build && rm -rf dist/*.map && cd ..
done

prettier --write **/dist/*.js

