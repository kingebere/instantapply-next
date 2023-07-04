import { NextApiRequest, NextApiResponse } from "next";
var crypto = require('crypto');

// Decryption function
function decrypt(encryptedText: string | string[] | undefined, secretKey: string) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    // Increment the count or perform any tracking logic here

    // Get the user IP address
    const ipAddress =
      req.headers["x-forwarded-for"] || "" || req.socket.remoteAddress;

    // Get the user's location based on the country code
    const location = req.headers["x-vercel-ip-country"];

    // Log the tracking information
    console.log("Tracking Information:");
    console.log("ID:", id);
    console.log("IP Address:", ipAddress);
    console.log("Location:", location);

    const secretKey = "Instant"; // Replace with your own secret key

    const decryptedText = decrypt(id, secretKey);
    console.log("Decrypted:", decryptedText);

    // Redirect to the original URL
    res.writeHead(302, { Location: decryptedText });
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
