# Base image
FROM nginx:alpine

# Install pnpm
RUN pnpm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the container
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install -f

# Copy the application code to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD [ "pnpm", "run", "start:prod" ]
