import { supabase } from "@/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { countries } from "../../utils/countries";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { $: trackingID } = req.query;

		// Get the user's location based on the country code
		const countryCode = req.headers["x-vercel-ip-country"];
		const city = req.headers["x-vercel-ip-city"];
		const country = countries.filter((country) => country.Code === countryCode);

		const visitorData = {
			country: country[0] && country[0].Name,
			city,
			linksid: trackingID,
		};

		// Increment the count or perform any tracking logic here
		if (trackingID) {
			//get the originalURl
			const { data, error } = await supabase
				.from("superlinks")
				.select("originalUrl")
				.eq("identifier", trackingID);

			if (error) throw error;

			//save the visitors details

			const { data: dataVisitor, error: visitorError } = await supabase
				.from("visitorsdata")
				.insert(visitorData) ;

			if (visitorError) {
				throw visitorError;
			}

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
}
