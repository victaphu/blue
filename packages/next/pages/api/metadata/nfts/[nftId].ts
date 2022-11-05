// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

require('dotenv').config();

// erc721 - get metadata from the nft directly
const abi721 = [
  "function ownerOf(uint256) external view returns (address)"
]

const getTemplate = (tokenId: any) => {
  const template = `{
  "title": "Blue NFT (BLUE)",
  "type": "object",
  "properties": {
      "name": {
          "type": "string",
          "description": "BlueNFT"
      },
      "description": {
          "type": "string",
          "description": "Blue framework for integration Bluetooth devices into the blockchain"
      },
      "image": {
          "type": "string",
          "description": "${process.env.IMAGE_URI}/${tokenId}"
      }
  }
}`;
  return JSON.parse(template);
};
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC!);
const contract = new ethers.Contract(process.env.Blue721!, abi721, provider);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId } = req.query;

  try {
    console.log(await contract.ownerOf(nftId)); // check if the token exists
    // proxy the image to the website by first loading the
    // token from the contract (721) decoding the props and
    // then retrieving image
    res.status(200).json(getTemplate(nftId));
  }
  catch (e) {
    res.status(404).json({"error": "token not found"});
  }
}
