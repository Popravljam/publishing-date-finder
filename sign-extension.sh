#!/bin/bash

# Sign Firefox Extension for Self-Distribution
# This creates a signed .xpi file that users can install permanently

# DO NOT hardcode secrets. Set these as environment variables before running:
# export AMO_JWT_ISSUER={{AMO_JWT_ISSUER}}
# export AMO_JWT_SECRET={{AMO_JWT_SECRET}}

# Sign the extension (uses env vars automatically)
web-ext sign \
  --channel=unlisted

# The signed .xpi will be in ./web-ext-artifacts/
echo ""
echo "✅ Signed extension created in: ./web-ext-artifacts/"
echo "📦 Upload this .xpi file to your hosting"
