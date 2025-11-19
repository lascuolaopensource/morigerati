#!/bin/sh
set -e

# Run database migrations
echo "Running database migrations..."
corepack enable pnpm
pnpm payload migrate

# If migrations fail, exit with error
if [ $? -ne 0 ]; then
  echo "Migration failed. Exiting."
  exit 1
fi

echo "Migrations completed successfully. Starting application..."

# Execute the main command
exec "$@"

