#!/usr/bin/env bash
set -x

npm cache clean --force
yarn cache clean

git clean -fdX 
npm install
npm run build
npm link

cd ~/temp

rm -rf store

mkdir store

cd store

klap init

npm run build

