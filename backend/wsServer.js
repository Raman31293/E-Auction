const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();

// Configure CORS options // otherwise error during bidding
const corsOptions = {
  origin: "http://localhost:3000", // Replace with the origin of your frontend application
  methods: ["GET", "POST"],
};

// Create a WebSocket server with CORS options
const wss = new WebSocket.Server({ server, cors: corsOptions });

// Listen for WebSocket connections
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  // Listen for messages from clients
  ws.on("message", function incoming(message) {
    console.log("Received message:", message);
  });

  // Example: Broadcast a message to all clients
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send("New bid placed!");
    }
  });
});

server.listen(8080, () => {
  console.log("WebSocket server started on port 8080");
});