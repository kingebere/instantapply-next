
import S3 from 'aws-sdk/clients/s3.js';

import type { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3({
    endpoint: `https://${process.env.NEXT_PUBLIC_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    accessKeyId: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_SECRET}`,
    signatureVersion: 'v4',
  });



export default function handler(req: NextApiRequest, res: NextApiResponse) {

const params={
    Bucket: 'uiland',
    Key:"upload.pdf",
    Body:req.body
}
      s3.upload(params, function(err:any, data:any) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      })



}