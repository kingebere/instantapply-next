import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigin = [
    "https://jobs.lever.co",
    "https://boards.greenhouse.io",
    "https://jobs.ashbyhq.com",
    "https://mail.google.com",
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
  const { session } = req.body;
  const {
    data: {
      session: { user },
    },
  } = JSON.parse(session);

  try {
    // Query the 'profile' table for data related to the user ID
    const { data: dbdata, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user?.id);
    if (dbdata) {
      // Return the retrieved data if it exists
      return res.status(200).json({
        data: dbdata[0],
      });
    } else throw new Error("User not found");
    
  } catch (err: any) {

    res.status(500).json({ message: "Internal Server Error" });
    
  
  }
}
