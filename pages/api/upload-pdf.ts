import S3 from "aws-sdk/clients/s3.js"

import type { NextApiRequest, NextApiResponse } from "next"


const s3 = new S3({
  endpoint: `https://${process.env.NEXT_PUBLIC_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_SECRET}`,
  signatureVersion: "v4",
  s3ForcePathStyle: true,
  // region:'auto',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the base64-encoded PDF data from the request body
    const { pdfBlob } = req.body;

    // Convert the base64 data to a Buffer object
    const base64Data = Buffer.from(pdfBlob.replace(/^data:application\/\w+;base64,/, ""), "base64");

    // Define the parameters for uploading to S3
    const params = {
      Bucket: "instantapply",
      Key: req.query.file as string,
      Body: base64Data,
      ContentType: req.query.fileType as string,
    };

    // Upload the file to S3
    s3.upload(params, function (err: any, data: any) {
      if (err) {
        // If an error occurs during the upload, log the error and send a response with an error message
        console.log(err, err.stack);
        return res.status(500).json({ error: 'Failed to upload file' });
      } else {
        // If the upload is successful, send a response with the URL of the uploaded file -- for signed url
        // If the upload is successful.send a response with the public url and the data key  -- for public url
        return res.json({ url:`https://pub-1b721db15d0342048e62b290ea6ae12a.r2.dev/${data.Key}`,filename:data.key  });
      }
    });
  } catch (error) {
    // Handle any other errors that may occur within the try block
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
}


