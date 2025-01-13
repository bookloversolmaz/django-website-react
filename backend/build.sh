#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Change to the frontend directory and build the React app
cd ../frontend
yarn
yarn build

# Return to the backend directory
cd ../backend

# Collect static files
python manage.py collectstatic --no-input