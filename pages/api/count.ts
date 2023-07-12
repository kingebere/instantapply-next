import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");

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
