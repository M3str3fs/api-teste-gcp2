# Base image
FROM node:18-alpine

# Install pnpm
RUN npm install -g

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the container
COPY package.json npm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install

# Copy the application code to the container
COPY . .

# Start the application
CMD [ "pnpm", "run", "start:dev" ]
