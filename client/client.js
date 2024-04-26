const net = require('net');
const fs = require('fs');
const crypto = require('crypto');

// Default server address and port are set to "localhost" and 8080 respectively, unless provided as command line arguments
const SERVER_ADDR = process.argv[2] || "localhost";
const PORT = process.argv[3] || 8080;

// Creating a new TCP client socket
const client = new net.Socket();

// Connecting to the server
client.connect(PORT, SERVER_ADDR, () => {
  console.log(`Connected to server at ${SERVER_ADDR}:${PORT}`);

  const receivedData = []; // Array to store received data chunks

  // Event listener for receiving data from the server
  client.on('data', (data) => {
    receivedData.push(data); // Collect received data
    console.log(`Received data from server: ${data.toString()}`); // Log received data
  });

  // Event listener for server connection termination
  client.on('end', () => {
    const buffer = Buffer.concat(receivedData); // Concatenate all received data chunks into a single buffer

    // Save the received data to a file
    fs.writeFileSync('received_file.txt', buffer);

    // Calculate the MD5 checksum of the received file
    const hasher = crypto.createHash('md5');
    hasher.update(buffer);
    const checksum = hasher.digest('hex');

    console.log(`Received a file with checksum: ${checksum}`);
  });

  // Event listener for client disconnection
  client.on("end", () => {
    console.log("Disconnected from server");
  });

  // Event listener for client socket errors
  client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
});
