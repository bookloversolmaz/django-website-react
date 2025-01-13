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

# # Apply database migrations
# python manage.py migrate
#!/usr/bin/env bash
# Exit on error
# set -o errexit

# # Ensure system-level dependencies are installed
# echo "Installing system-level dependencies..."
# if [ -x "$(command -v apt-get)" ]; then
#     sudo apt-get update
#     sudo apt-get install -y libsystemd-dev
# elif [ -x "$(command -v yum)" ]; then
#     sudo yum install -y systemd-devel
# elif [ -x "$(command -v pacman)" ]; then
#     sudo pacman -S --noconfirm systemd
# else
#     echo "Unsupported package manager. Please install libsystemd-dev manually."
#     exit 1
# fi

# # Install Python dependencies
# echo "Installing Python dependencies..."
# pip install -r requirements.txt

# # Build the React frontend
# echo "Building the React app..."
# cd ../frontend
# yarn install
# yarn build

# # Return to the backend directory
# cd ../backend

# # Collect static files
# echo "Collecting static files..."
# python manage.py collectstatic --no-input

# # Apply database migrations
# echo "Applying database migrations..."
# python manage.py migrate
