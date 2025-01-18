# Use Node.js 16 as the base image
FROM node:16

# Set the working directory
WORKDIR /code

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Clean the yarn cache
RUN yarn cache clean

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3000

# Command to start the app
CMD ["yarn", "start"]