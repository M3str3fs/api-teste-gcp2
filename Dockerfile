# Base image
FROM node:18-alpine

# Start the application
CMD [ "pnpm", "run", "start:prod" ]
