# Use the official Node.js 14.17.0 image
FROM node:14.17.0-alpine

# Set the working directory inside the Docker container
WORKDIR /app

# Copy the server script into the working directory
COPY server.js /app/server.js

# Set executable permissions for the server.js file
RUN chmod +x /app/server.js

# create a dir for serverdata
RUN mkdir /app/serverdata

# Expose the port on which your server will run
EXPOSE 8080

# Command to run the server
CMD ["node", "server.js" , "0.0.0.0", "8080"]