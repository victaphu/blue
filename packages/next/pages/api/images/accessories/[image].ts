// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ethers } from 'ethers';

require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const abi721 = ['function ownerOf(uint256) external view returns (address)'];

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC!);
const contract = new ethers.Contract(process.env.Blue721!, abi721, provider);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image } = req.query;
  try {
    // proxy the image to the website by first loading the
    // token from the contract (721) decoding the props and
    // then retrieving image

    const pathRef = ref(storage, `accessories/${image!}.png`);

    getDownloadURL(pathRef).then((url) => {
      console.log(url);
      fetch(url)
        .then((r: any) => {
          const contentType = r.headers.get('content-type');
          console.log('loaded data', contentType);

          console.log('piping stream ');
          r.body.pipe(res);
        })
        .catch((e) => {
          console.log('Failed', e);
          res.status(404).json({ error: 'not found' });
        });
    }, (error) => {
      console.log("Failed with", error)
      res.status(404).json({error: "token not found"});
    });
  } catch (e) {
    res.status(404).json({ error: 'token not found' });
  }
}
