import { NextApiRequest, NextApiResponse } from "next";
var forge = require('node-forge');
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

    // Convert the Base64-encoded encrypted string to bytes
    const encryptedBytes = forge.util.decode64(id);

    // Create a new decryption cipher
    const decipher = forge.cipher.createDecipher("AES-CBC", secretKey);
    decipher.start();
    decipher.update(forge.util.createBuffer(encryptedBytes));
    decipher.finish();

    // Get the decrypted bytes
    const decryptedBytes = decipher.output.getBytes();

    // Convert the decrypted bytes to a UTF-8 string
    const decryptedString = forge.util.decodeUtf8(decryptedBytes);
console.log("decrypt",decryptedString)
    // Redirect to the original URL
    res.writeHead(302, { Location: decryptedString });
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
