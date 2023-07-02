import { NextApiRequest, NextApiResponse } from "next";
import WebSocket from "ws";

import { sesClient } from "../../lib/sesClient";
import { createSendEmailCommand } from "@/lib/helpers";
import { supabase } from "@/supabase";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { email, jobId, userStatus } = req.query;

		try {
			
		
			if (jobId && userStatus !== "sender") {
	
				//find the job
				const { data, error } = await supabase
					.from("jobviews")
					.select("*")
					.eq("job_id", jobId);

				if (error) throw error;

				if (!data[0]) console.log("no data found");

				//fecth the view count value for that job
				const viewCount = data[0]?.count;

				//if the count value is less that 0 send the message and update the count
				if (viewCount < 0) {
					const sendEmailCommand = createSendEmailCommand(
						"adeizam01@gmail.com",
						"design@uiland.design",
						email as string
					);
					const result = await sesClient.send(sendEmailCommand);
								console.log('email sent')
				}
      
			
	

				//update the count
				const { data: countData, error: countError } = await supabase.rpc(
					"submit",
					{
						job_id: jobId,
						increment_num: 1,
					}
				);

				if (countError) {
					throw countError;
				}
			}
		}
		catch(error) { 
			console.error(error);
		}
		//for both cases send the buffer image
		const pixelImage = Buffer.from(
			"R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
			"base64"
		);
		res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Expires', '0');
		res.setHeader('Surrogate-Control', 'no-store');
		res.setHeader("Content-Type", "image/gif");

		res.send(pixelImage);
	} else {
		res.status(405).json({ error: "Method not allowed" });
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
