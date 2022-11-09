import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
require('dotenv').config();


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const { address } = req.query //process.env.Blue721 || '0x124E3F3ED78A7D684FaFcfAdbF8e3DD9F4e9c958';
        
        if (!address || typeof(address) !== 'string') {
            res.status(404).json({ error: 'No address defined'});
            return;
        }
        await Moralis.start({
            apiKey: process.env.MORALIS_API_KEY!,
            // ...and any other configuration
        });
        const chain = EvmChain.BSC_TESTNET;

        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            tokenAddresses: [process.env.Blue721 || '0x124E3F3ED78A7D684FaFcfAdbF8e3DD9F4e9c958'],
            address,
            chain,
        });

        console.log(response);
        res.status(200).json(response);
    } catch (e) {
        res.status(503).json({ error: `Failed because of ${e}` });
    }
}
