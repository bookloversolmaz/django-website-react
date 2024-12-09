#!/usr/bin/env bash
# Exit on error
set -o errexit

# Ensure we are in the backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Change to the frontend directory and build the React app
cd ../frontend
npm install
npm run build

# Return to the backend directory
cd ../backend

# Collect static files
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate
