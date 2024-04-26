# Use the official Node.js 14.17.0 image
FROM node:14.17.0-alpine

# Set the working directory inside the Docker container
WORKDIR /app

# Copy the client script into the working directory
COPY client.js /app/client.js

# Set executable permissions for the client.js file
RUN chmod +x /app/client.js

# Create a directory for the client
RUN mkdir /app/clientdata

# Command to run the client
CMD ["node", "client.js", "server", "8080"]