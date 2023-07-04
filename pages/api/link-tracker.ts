import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, originalUrl } = req.query;

    // Increment the count or perform any tracking logic here

    // Get the user IP address
    const ipAddress =
      req.headers["x-forwarded-for"] || "" || req.socket.remoteAddress;

    // Get the user's location based on the country code
    const location = req.headers["x-vercel-ip-country"];

    // Log the tracking information
    console.log("Tracking Information:");
    console.log("ID:", id);
    console.log("Original URL:", originalUrl);
    console.log("IP Address:", ipAddress);
    console.log("Location:", location);

    // Redirect to the original URL
    res.writeHead(302, { Location: originalUrl });
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
