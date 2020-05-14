#!/usr/bin/env bash
set -x

git clean -fdX

npm link

npm run build

cd examples

for dir in $(ls)
do
	cd ${dir} && klap build && rm -rf dist/*.map && cd ..
done

prettier --write **/dist/*.js

