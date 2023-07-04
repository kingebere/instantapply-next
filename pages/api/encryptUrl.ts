import { NextApiRequest, NextApiResponse } from "next";
var crypto = require('crypto');


function encrypt(text: any, secretKey: any) {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, crypto.randomBytes(16));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
const secretKey="Instant"
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
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin as string);
    
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Authorization, Content-Type"
        );
        res.status(200).end();
        return;
      }
    const {match} =req.body
console.log("match",match)
    const encryptedText = encrypt(match, secretKey);
console.log('Encrypted:', encryptedText);
res.status(200).send(encryptedText)

}