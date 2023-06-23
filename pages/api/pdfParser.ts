import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import pdf from "pdf-parse";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    "https://pub-1b721db15d0342048e62b290ea6ae12a.r2.dev/DIKE-GOODLUCK RESUME-JUN-FRONTEND-2023.pdf";

  try {
    // Fetch the PDF file from the provided URL
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Parse the PDF data
    const data = await pdf(response.data);

    // Get the extracted text
    const text = data.text;

    // Return the extracted text as the API response
    res.status(200).json({ text });
  } catch (error) {
    console.error("Error fetching or parsing PDF:", error);
    res.status(500).json({ error: "Error fetching or parsing PDF" });
  }
}
