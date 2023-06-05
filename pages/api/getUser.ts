import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


    res.setHeader("Access-Control-Allow-Origin", "https://boards.greenhouse.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "https://boards.greenhouse.io");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.status(200).end();
    return;
  }

  // Extract the token from the request headers
  const token =
    req.headers && req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;

  // Retrieve user data using the token
  const { data, error } = await supabase.auth.getUser(token);

  if (data) {
    const { user } = data;

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
    }

    // Handle the case when no data is found in the 'profile' table
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
