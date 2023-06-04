import S3 from "aws-sdk/clients/s3.js"

import type { NextApiRequest, NextApiResponse } from "next"

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

const s3 = new S3({
  endpoint: `https://${process.env.NEXT_PUBLIC_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_SECRET}`,
  signatureVersion: "v4",
  s3ForcePathStyle: true,
  // region:'auto',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const name = req.body.name
  // const file = req.body.file

 
  const params = {
    Bucket: "instantapply",
    Key: req.query.file as string,
    Body: req.body,
    ContentType: req.query.fileType as string,
  }
  s3.upload(params, function (err: any, data: any) {
    if (err) console.log(err, err.stack) // an error occurred
    else return res.json({ url: data.Location }) // successful response
  })
}

// import S3 from 'aws-sdk/clients/s3.js';

// import type { NextApiRequest, NextApiResponse } from 'next';

// import formidable from 'formidable';
// import fs from 'fs';
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

// const s3 = new S3({
//     endpoint: `https://${process.env.NEXT_PUBLIC_S3_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//     accessKeyId: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID}`,
//     secretAccessKey: `${process.env.NEXT_PUBLIC_S3_ACCESS_KEY_SECRET}`,
//     signatureVersion: "v4",
//     s3ForcePathStyle: true
//     // region:'auto',
//   });
//        // parse request to readable form
//   const form = new formidable.IncomingForm();
//   form.parse(req, async (err, fields, files) => {
//     // Account for parsing errors
//     if (err) return res.status(500);
//     // Read file
//     console.log("v",fields)
//     console.log("l",files)
//     const file = fs.readFileSync(files.file.path);
//     // Upload the file
//     s3.upload({
//       // params
//       Bucket: "instantapply",
//       Key:"upload.png",
//       Body:file,
//       ContentType: "application/pdf",
//     })
//     .send((err, data) => {
//       if (err) {
//         console.log('err',err)
//         return res.status(500);
//       };
//       if (data) {
//         console.log('data',data)

//         return res.json({
//           url:  data.Location,
//         });
//       };
//     });
//   });

// }
