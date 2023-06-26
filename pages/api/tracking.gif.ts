import { NextApiRequest, NextApiResponse } from "next";
import WebSocket from "ws";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { email } = req.query;

    // Perform tracking logic here, such as recording the email open event
    console.log(email, "works");

    // Send a message to the WebSocket server
    const message = { email: email, count: 1 };

    const connectWebSocket = () => {
      const socket = new WebSocket("wss://instantapplywebsockett.onrender.com");

      // Wait for the WebSocket connection to be established
      socket.on('open', () => {
        console.log('WebSocket connection established', message);

        // Send a message to the WebSocket server
        socket.send(JSON.stringify(message));
      });

      // Handle WebSocket messages received from the server
      socket.on('message', (message) => {
        console.log('Received message from WebSocket server:', message);

        // Close the WebSocket connection
        socket.close();
      });

      // Handle WebSocket connection close
      socket.on('close', () => {
        console.log('WebSocket connection closed');

        // Retry connection after a delay
        setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
      });

      // Handle WebSocket errors
      socket.on('error', (error) => {
        console.error('WebSocket error:', error);

        // Close the WebSocket connection and retry after a delay
        socket.close();
        setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
      });
    };

    try {
      // Start the WebSocket connection
      connectWebSocket();

      // Return a success response
      res.status(200).json({ success: true });
    } catch (error) {
      // Handle errors
      console.error("Error sending notification:", error);

      // Return an error response
      res.status(500).json({ error: "Failed to send notification" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
