import { supabase } from "@/supabase";
import { NextApiRequest, NextApiResponse } from "next";
var crypto = require("crypto");

// // Decryption function
// function decrypt(encryptedText: string | string[] | undefined, secretKey: any) {
//     const algorithm = 'aes-256-cbc';
//     const key = crypto.createHash('sha256').update(secretKey).digest();
//     const iv = Buffer.alloc(16, 0); // Use a proper initialization vector (IV) for security

//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
//   }
// Function to generate a 256-bit key from a password (you can use a better key derivation function in production)
//  function generateKey(password: string) {
//     return crypto
//       .createHash("sha256")
//       .update(password)
//       .digest();
//   }
// const secretKey = generateKey("Instant"); // Replace with your own secret key
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { $: trackingID } = req.query;

		// Increment the count or perform any tracking logic here
		if (trackingID) {
			//get the originalURl
			const { data, error } = await supabase
				.from("superlinks")
				.select("originalUrl");

			if (error) throw error;

			//update the count
			const { data: countData, error: countError } = await supabase.rpc(
				"update_link_count",
				{
					linkid: trackingID,
					increment: 1,
				}
			);

			if (countError) {
				throw countError;
			}

			if (data) {
				const originalURl = data[0].originalUrl;
				res.writeHead(302, { Location: originalURl });
				res.end();
			}
		} else {
			res.status(400).json({ message: "bad request" });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}

	// Get the user IP address
	const ipAddress =
		req.headers["x-forwarded-for"] || "" || req.socket.remoteAddress;

	// Get the user's location based on the country code
	const location = req.headers["x-vercel-ip-country"];

	// Log the tracking information

	//     const algorithm = 'aes-256-cbc';
	// const password = 'Instant';
	// const key = crypto.scryptSync(password, 'salt', 32);
	// const iv = Buffer.alloc(16, 0);

	//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
	//     let decrypted = decipher.update(id, 'hex', 'utf8');
	//     decrypted += decipher.final('utf8');
	//     console.log(decrypted); // outputs the decrypted data

	//     // Redirect to the original URL
	//     res.writeHead(302, { Location: decrypted });
	//     res.end();
}
