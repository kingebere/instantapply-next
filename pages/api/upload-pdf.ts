// Require the library


import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from 'next';




export default function handler(req: NextApiRequest, res: NextApiResponse) {
// console.log("great",req.body)


const client = new S3Client({
   region:"auto",   
   endpoint: `https://${process.env.NEXT_PUBLIC_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
   credentials:{
    accessKeyId: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID}`,
secretAccessKey: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_SECRET}`,

   }
});

  const command = new PutObjectCommand({
    Bucket: "uiland",
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });
const insertToProfile = async () => {
  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }

}
insertToProfile()
}



