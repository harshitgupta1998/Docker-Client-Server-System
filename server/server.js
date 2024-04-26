const net = require('net');
const fs = require('fs');
const crypto = require('crypto');

// Default HOST and PORT are set to "localhost" and 8080 respectively, unless provided as command line arguments
const SERVER_HOST = process.argv[2] || "localhost";
const SERVER_PORT = process.argv[3] || 8080;

// Creating a TCP server
const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}`);

  // Generating approximately 1KB of text data
  const generatedText = "This is a text-based 1KB file for ECC assignment. ".repeat(32); // Repetition to approximate 1KB

  // File name where the text data will be written
  const outputFileName = 'text_file.txt';
  fs.writeFileSync(outputFileName, generatedText);

  // Calculating the MD5 checksum of the generated text
  const md5Hasher = crypto.createHash('md5');
  md5Hasher.update(generatedText);
  const fileChecksum = md5Hasher.digest('hex');
  console.log(`Checksum for the generated file: ${fileChecksum}`);

  // Streaming the file to the client over the socket
  const fileStream = fs.createReadStream(outputFileName);
  fileStream.pipe(socket);

  // Handling client disconnection
  socket.on('end', () => {
    console.log(`Client disconnected: ${socket.remoteAddress}`);
  });

  // Handling socket errors
  socket.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
});

// Handling server-level errors
server.on("error", (err) => {
  console.error("Server error:", err);
});

// Starting the server to listen on the specified port and host
server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server started on ${SERVER_HOST}:${SERVER_PORT}`);
});
