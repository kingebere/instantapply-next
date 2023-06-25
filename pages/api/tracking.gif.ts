// pages/api/track-open.js
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { email } = req.query;

    // Perform tracking logic here, such as recording the email open event
    console.log(email, "works");
    console.log(res, "res");
    // Respond with the pixel image (1x1 transparent GIF)
    const pixelImage = Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      "base64"
    );
    res.setHeader("Content-Type", "image/gif");
    res.send(pixelImage);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
