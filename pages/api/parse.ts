import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";
import { getChatGPTResponse, parsePDFBYURL } from "@/lib/helpers";

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

        res.setHeader(
            "Access-Control-Allow-Origin",
            req.headers.origin as string
        );
    
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Authorization, Content-Type"
        );
        res.status(200).end();
        return;
    }

    if (req.method === "POST") {
        const { session } = req.body;
        const {
          data: {
            session: { user },
          },
        } = JSON.parse(session);
    
        try {
            const { data, error } = await supabase
                .from("profile")
                .select("resume_url")
                .eq("id", user.id);
            if (error) throw error;
    
            const { resume_url } = data[0];
            if (resume_url) {
                //parse the user resume
                const pdfText = await parsePDFBYURL(resume_url)
                if (pdfText) {
                    res.status(200).json({
                      message: pdfText,
                    });
                  }
            }
        }
            catch (e) {
                console.error(e);
                res.status(500).json({
                    message: "internal server error",
                });
            }
        }
}