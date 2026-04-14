#!/bin/bash
cd /Users/dannybrown/Claude/职业规划/web-dev/xxcrypto-gtm
echo "Starting Next.js build..."
echo "Node version:"
node --version
echo ""
echo "NPM version:"
npm --version
echo ""
echo "Running build..."
npm run build 2>&1
BUILD_EXIT_CODE=$?
echo ""
echo "Build exit code: $BUILD_EXIT_CODE"

if [ -f ./.next/BUILD_ID ]; then
  echo ""
  echo "Build ID:"
  cat ./.next/BUILD_ID
fi

echo ""
echo "Checking build output structure..."
ls -la .next/ 2>/dev/null | head -20

exit $BUILD_EXIT_CODE
