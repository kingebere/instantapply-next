import { NextApiRequest, NextApiResponse } from "next";
import WebSocket from "ws";

import { sesClient } from "../../lib/sesClient";
import { createSendEmailCommand } from "@/lib/helpers";
import { supabase } from "@/supabase";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const allowedOrigin = [
		"https://jobs.lever.co",
		"https://boards.greenhouse.io",
		"https://jobs.ashbyhq.com",
		"https://mail.google.com",
		"https://*.bamboohr.com",
		"https://*.bamboohr.co.uk",
	];

	//since Access-Control-Allow-Origin doesnt allow multiple value , we
	//make a checker that adds the allowed url based on the headers.origin
	if (allowedOrigin.includes(req.headers.origin as string)) {
		res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);
	}
	res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
	// Handle preflight requests
	if (req.method === "OPTIONS") {
		res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);

		res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Authorization, Content-Type"
		);
		res.status(200).end();
		return;
	}
	if (req.method === "POST") {
		const { jobDescription, session } = req.body;
		const {
			data: {
				session: { user },
			},
		} = JSON.parse(session);

		const emailData = {
			...jobDescription,
			user_id: user?.id,
		};
		try {
			// get a tailored response for the resume and job description
			if (jobDescription) {
				const { data, error } = await supabase
					.from("jobviews")
					.insert(emailData);
				if (error) throw error;
				res.status(200).json({ message: "ok" });
			} else {
				res.status(400).json({ message: "Bad request" });
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				message: "internal server error",
			});
		}
	}
}

// const { email } = req.query;
// const { sender } = req.query;
// const { id } = req.query;
// const count = 1;

// try {

// 	const result = await sesClient.send(sendEmailCommand);
// 	console.log("Email sent successfully:", result);
// 	res.status(200).json({ message: "Email sent successfully" });
// } catch (error) {
// 	console.error("Failed to send email:", error);
// 	res.status(500).json({ error: "Failed to send email" });
// }
// Perform tracking logic here, such as recording the email open event to dB

// // Send a message to the WebSocket server
// const message = { email: email, count: 1 };

// const connectWebSocket = () => {
//   const socket = new WebSocket("wss://instantapplywebsockett.onrender.com");

//   // Wait for the WebSocket connection to be established
//   socket.on("open", () => {
//     console.log("WebSocket connection established", message);

//     // Send a message to the WebSocket server
//     socket.send(JSON.stringify(message));
//   });

//   // Handle WebSocket messages received from the server
//   socket.on("message", (message) => {
//     console.log("Received message from WebSocket server:", message);

//     // Close the WebSocket connection
//     socket.close();
//   });

//   // Handle WebSocket connection close
//   socket.on("close", () => {
//     console.log("WebSocket connection closed");

//     // Retry connection after a delay
//     setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
//   });

//   // Handle WebSocket errors
//   socket.on("error", (error) => {
//     console.error("WebSocket error:", error);

//     // Close the WebSocket connection and retry after a delay
//     socket.close();
//     setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
//   });
// };

// try {
//   // Start the WebSocket connection
//   connectWebSocket();

//   // Return a success response
//   res.status(200).json({ success: true });
// } catch (error) {
//   // Handle errors
//   console.error("Error sending notification:", error);

//   // Return an error response
//   res.status(500).json({ error: "Failed to send notification" });
// 	// }
// } else {
// 	res.status(405).json({ error: "Method not allowed" });
// }
