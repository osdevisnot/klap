#!/usr/bin/env bash
# set -x

# npm cache clean --force
# yarn cache clean

# git clean -fdX 
# npm link

cd examples

for dir in scaffold scaffold-typescript react-component react-typescript react-sc-typescript
do
	cd ${dir} && klap build && rm -rf dist/*.map && cd ..
done

prettier --write **/dist/*.js

