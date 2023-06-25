import WebSocket from "ws";
import { NextApiRequest, NextApiResponse } from "next";
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  // Handle incoming messages
  ws.on("message", (message) => {
    // Process the message as per your requirement
    console.log("Received message:", message);

    // Send a response back to the client
    ws.send("Message received!");
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Upgrade the HTTP request to a WebSocket connection
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      wss.emit("connection", ws);
    });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
