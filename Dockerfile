# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the container
COPY package.json .

# Install dependencies using pnpm
RUN npm install -f

# Copy the application code to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD [ "yarn", "start:prod" ]
