# Base image
FROM node:18-alpine

# Install pnpm
RUN pnpm install -g

# Set the working directory
WORKDIR /dist

# Copy package.json and pnpm-lock.yaml files to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the application code to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD [ "pnpm", "run", "start:dev" ]
