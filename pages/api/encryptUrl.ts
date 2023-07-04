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
    const {match} =req.body

    const encryptedText = encrypt(match, secretKey);
console.log('Encrypted:', encryptedText);
res.status(200).send(encryptedText)

}