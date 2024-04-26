Instructions for running the code:

If you're using Docker build and Docker run, follow these steps:

Clone the repository.
Install Docker Desktop from here and start Docker Desktop.
Navigate to the 'server' and 'client' folders and execute the following commands to test locally: node server.js and node client.js.
To build and run the server:
javascript
Copy code
docker build -t server -f ./Dockerfile .
docker run -v servervol:/app/serverdata -p 8080:8080 -d --name server --network prithvi server
To build and run the client:
javascript
Copy code
docker build -t client -f ./Dockerfile .
docker run -v clientvol:/app/clientdata -d --name client --network prithvi client
Verify the outcome using Docker Desktop.
If you're using docker-compose.yml:

Clone the repository.
Install Docker Desktop.
Run docker-compose up -d.
Verify the outcome using Docker Desktop.