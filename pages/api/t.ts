import { supabase } from "@/supabase";
import { NextApiRequest, NextApiResponse } from "next";

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
}
