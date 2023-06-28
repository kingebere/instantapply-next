import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";
import {
  getChatGPTResponse,
  parsePDFBYURL,
  scrapeWebPage,
} from "@/lib/helpers";

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
    "https://api.openai.com",
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
    if (allowedOrigin.includes(req.headers.origin as string)) {
      res.setHeader(
        "Access-Control-Allow-Origin",
        req.headers.origin as string
      );
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type"
    );
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    const { name, id } = req.query;

    // Usage example
    const webpageURL = `https://jobs.lever.co/${name}/${id}`;

    const elementSelector = "[data-qa='job-description']"; // CSS selector of the HTML element you want to scrape
    scrapeWebPage(webpageURL, elementSelector)
      .then((content) => {
        res.status(200).json({
          jobRequirement: content,
        });
        // Use the scraped content as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  }
}
