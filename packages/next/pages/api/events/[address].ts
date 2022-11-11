// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import admin from 'firebase-admin';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

require('dotenv').config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY!,
      // ...and any other configuration
    });

    const {address} = req.query;

    if (!address || typeof(address) !== 'string') {
      res.status(404).json({"error" : "failed - no data provided"});
      return;
    }

    const chain = EvmChain.BSC_TESTNET;

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });

    console.log(response);
    res.json(response);
  } catch (e) {
    res.status(404).json({ error: 'token not found' });
  }
}
