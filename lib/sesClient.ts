import { SESClient } from "@aws-sdk/client-ses";
// Set the AWS Region.
const REGION = "eu-north-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION,credentials:{accessKeyId: process.env.NEXT_PUBLIC_SES_ACCESS_SECRET|| "",secretAccessKey: process.env.NEXT_PUBLIC_SES_SECRET_ACCESS_SECRET|| ""} });
export { sesClient };


// apiVersion: '2010-12-01',
// accessKeyId: process.env.NEXT_PUBLIC_SES_ACCESS_SECRET,
// secretAccessKey: process.env.NEXT_PUBLIC_SES_SECRET_ACCESS_SECRET