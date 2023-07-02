import { NextApiRequest, NextApiResponse } from "next";
import ip from 'ip';

export default async function handler(	req: NextApiRequest,
	res: NextApiResponse) {
    const ipAddress = ip.address();	
	console.log(ipAddress);
	res.status(200).send(ipAddress);
}