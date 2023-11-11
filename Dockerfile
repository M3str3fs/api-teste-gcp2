# Base image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the container
COPY package.json ./

# Install dependencies using pnpm
RUN npm install -f

# Copy the application code to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 80

# Start the application
CMD [ "npm", "run", "start:prod" ]
# FROM nginx:alpine
# COPY . /usr/share/nginx/html