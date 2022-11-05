// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
require('dotenv').config();

type Data = {
  verified?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // todo: we should consider adding chain restriction as well
  // also, this is where we could restrict the address access to pre-approved
  
  try {
    const { address } = req.query;

    const msgHash = ethers.utils.solidityKeccak256(['address'], [address]);
    const signer = new ethers.Wallet(process.env.WALLET!);

    let signature = await signer.signMessage(ethers.utils.arrayify(msgHash));
    res.status(200).json({ verified: signature });
  } catch (e) {
    res.status(503).json({ error: `Failed because of ${e}` });
  }
}
