import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";
import { getChatGPTResponse, parsePDFBYURL } from "@/lib/helpers";

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
	console.log("origin", req.headers.origin);
	//since Access-Control-Allow-Origin doesnt allow multiple value , we
	//make a checker that adds the allowed url based on the headers.origin

	res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);

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
		const { pdfText, jobDescription } = req.body;

		try {
			//get a tailored response for the resume and job description
			if (jobDescription && pdfText) {
				const chatGPTresponse = await getChatGPTResponse(
					jobDescription,
					pdfText
				);
				if (chatGPTresponse) {
					res.status(200).json({
						message: chatGPTresponse,
					});
				} else {
					res.status(404).json({ message: "not found" });
				}
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				message: "internal server error",
			});
		}
	}
}
