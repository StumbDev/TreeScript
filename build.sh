#!/bin/bash
echo "Starting new version build"
npm i
echo "using ./src/*.*"
echo "usinf ./src/lib/vscode/*.*"

# interpreter builder
npx pkg ./src/cli.mjs -o ./dist/ctsEnv
# vscode extencion builder
cd src
cd lib
cd vscode
cd treescript
npm i
npx vsce package -o ../../../../dist/vscode.vsix
echo "finished."