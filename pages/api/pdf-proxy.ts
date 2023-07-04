import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pdfUrl = req.query.url as string;
    const shouldAllowDownload = req.query.download === "true";

    const response = await fetch(pdfUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch PDF document");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "application/pdf");

    if (shouldAllowDownload) {
      res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    }

    res.send(buffer);
  } catch (error) {
    console.error("Error proxying PDF document:", error);
    res.status(500).end();
  }
}
