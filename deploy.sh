#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# push to gh-pages (a subtree of main branch)
git push -f git@github.com:tomliangg/binary-tree-visualizer.git main:gh-pages

cd -