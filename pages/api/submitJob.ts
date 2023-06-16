import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigin = [
    "https://jobs.lever.co",
    "https://boards.greenhouse.io",
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
  const { jobDescription } = req.body;
  try {
    const { data, error } = await supabase
      .from("jobsSubmitted")
      .insert(jobDescription);
    if (error) console.log(error);

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
