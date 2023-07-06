import { NextApiRequest, NextApiResponse } from "next";
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
	const { match, session } = req.body;

	const {
		data: {
			session: { user },
		},
	} = JSON.parse(session);

	//get match

	if (match && user) {
		try {
			const { data, error } = await supabase
				.from("superlinks")
				.insert({
					originalUrl: match,
					user_id: user.id,
				})
				.select();

			if (error) res.status(400).json({ message: "bad request" });
      if (data) {
   
				res.status(200).send(data[0]?.id);
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "internal server error" });
		}
	} else {
		res.status(400).json({ message: "bad request" });
	}

	//create a record for the match //record stores the original url

	//return the id of the record

	//      const shorten=nanoid(6)
	// console.log(shorten); // outputs the encrypted data
	// console.log('Encrypted:', shorten);
	// res.status(200).send(shorten)
}

// import { NextApiRequest, NextApiResponse } from "next";
// var crypto = require('crypto');
// import {nanoid} from "nanoid"

// function encrypt(text: any, secretKey: any) {
//     const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, crypto.randomBytes(16));
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
//   }
//   // Function to generate a 256-bit key from a password (you can use a better key derivation function in production)
// function generateKey(password: string) {
//     return crypto
//       .createHash("sha256")
//       .update(password)
//       .digest();
//   }
//   const secretKey = generateKey("Instant");
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     const allowedOrigin = [
//         "https://jobs.lever.co",
//         "https://boards.greenhouse.io",
//         "https://jobs.ashbyhq.com",
//         "https://mail.google.com",
//         "https://*.bamboohr.com",
//         "https://*.bamboohr.co.uk",
//       ];

//       //since Access-Control-Allow-Origin doesnt allow multiple value , we
//       //make a checker that adds the allowed url based on the headers.origin
//       if (allowedOrigin.includes(req.headers.origin as string)) {
//         res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);
//       }
//       res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//       res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
//       // Handle preflight requests
//       if (req.method === "OPTIONS") {
//         res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);

//         res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//         res.setHeader(
//           "Access-Control-Allow-Headers",
//           "Authorization, Content-Type"
//         );
//         res.status(200).end();
//         return;
//       }
//     const {match} =req.body
// console.log("match",match)
// const algorithm = 'aes-256-cbc';
// const password = 'Instant';
// const key = crypto.scryptSync(password, 'salt', 32);
// const iv = Buffer.alloc(16, 0);

// const cipher = crypto.createCipheriv(algorithm, key, iv);
// let encrypted = cipher.update(match, 'utf8', 'hex');
// encrypted += cipher.final('hex');
// console.log(encrypted); // outputs the encrypted data
// console.log('Encrypted:', encrypted);
// res.status(200).send(encrypted)

// }
