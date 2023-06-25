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
    const { userID } = req.query;

    try {
      const { data, error } = await supabase
        .from("profile")
        .select("submitcount")
        .eq("id", userID);
      if (error) throw error;
      if (data) {
        res.status(200).send({
          count: data[0].submitcount,
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }

  if (req.method === "POST") {
    const { userID } = req.body;

    try {
      const { data, error } = await supabase.rpc("submit", {
        user_id: userID,
        increment_num: 1,
      });

      if (error) throw error;

      res.status(201).json({
        message: "Count updated successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
}
