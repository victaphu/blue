// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { GenPlot } from '../../../../components/Nft/fairy-name';
import { GenPlot as FairHistoryPlot } from '../../../../components/Nft/fairy-history';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

const chain = EvmChain.BSC_TESTNET;

const address = process.env.Blue721!;

require('dotenv').config();

const getTemplate = (tokenId: any) => {
  const template = `{
  "title": "Blue NFT (BLUE)",
  "type": "object",
  "properties": {
      "name": {
          "type": "string",
          "description": "${GenPlot(tokenId)}"
      },
      "description": {
          "type": "string",
          "description": "${FairHistoryPlot(tokenId)}"
      },
      "image": {
          "type": "string",
          "description": "${process.env.IMAGE_URI}/${tokenId}"
      }
  }
}`;
  return JSON.parse(template);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId } = req.query;

  try {
    if (typeof(nftId) !== 'string' || !nftId) {
      res.status(404).json({ "error": "error - invalid params" });

      return 
    }
    // await Moralis.start({
    //   apiKey: process.env.MORALIS_API_KEY!,
    //   // ...and any other configuration
    // });

    // const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
    //   address,
    //   chain,
    //   tokenId: nftId,
    // });
    // console.log(response.result, address, chain, nftId);
    // if (response.result.length === 0) {
    //   res.status(404).json({ error: 'token not found'});
    //   return;
    // }
    // proxy the image to the website by first loading the
    // token from the contract (721) decoding the props and
    // then retrieving image
    res.status(200).json(getTemplate(nftId));
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: 'token not found' });
  }
}
