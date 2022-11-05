// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import admin from 'firebase-admin';

import fetch from 'node-fetch';

require('dotenv').config();

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.project_id,
      privateKey: process.env.private_key?.replace(/\\n/g, "\n"),
      clientEmail: process.env.client_email,
    }),
  });
} catch (e) {
  admin.app();
}

// erc721 - get metadata from the nft directly
const abi721 = [
  'function ownerOf(uint256) external view returns (address)',
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getProps',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'stats',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tones1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tones2',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tones3',
            type: 'uint256',
          },
        ],
        internalType: 'struct AvatarProps',
        name: '_prop',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const Properties = `HairLower
Background
Body
Eyes
Mouth
Socks
Shoes
Gloves
Pants
Top
Hair
Wings
Cape
CapeBack`.split('\n');

const Tones = `eyesTone
eyesTone2
maskTone
hairTone
hairTone2
underwearTone
underwearTone2
pantsTone
pantsTone2
topTone
topTone2
wingsTone
wingsTone2
shoesTone
socksTone
socksTone2
glovesTone
glovesTone2
hatTone
hatTone2
capeTone
capeTone2
beltTone
jacketTone
jacketTone2
neckTone
neckTone2`.split('\n');

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC!);
const contract = new ethers.Contract(process.env.Blue721!, abi721, provider);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { image } = req.query;
//     // console.log(await contract.ownerOf(image!)); // check if the token exists
//     // const props = await contract.getProps(image!);

//     const props = {
//       stats: ethers.BigNumber.from('802040803040306031516010102'),
//       tones1: ethers.BigNumber.from(
//         '569817364190926927660436971763180551566984312699071463034540679972715973'
//       ),
//       tones2: ethers.BigNumber.from(
//         '1244919888424663606094578703109016437618668896831306644990306111477694424'
//       ),
//       tones3: ethers.BigNumber.from(
//         '161027695078462936201312307226699908515057647823599'
//       ),
//     };

//     // proxy the image to the website by first loading the
//     // token from the contract (721) decoding the props and
//     // then retrieving image

//     console.log(props);
//     const paddedProps = (
//       new Array(Properties.length * 2).fill('0').join('') +
//       props.stats.toString()
//     ) // props.stats.toString()
//       .slice(-Properties.length * 2)
//       .match(/.{1,2}/g);

//     console.log(paddedProps);

//     const derivedAvatarProps = {} as any;

//     Properties.forEach((p, i) => {
//       if (+paddedProps![i] > 0) {
//         derivedAvatarProps[p] = (+paddedProps![i] - 1).toString();
//       }
//     });

//     const bigNumber = ethers.utils.hexlify(props.tones1);
//     const bigNumber2 = ethers.utils.hexlify(props.tones2);
//     const bigNumber3 = ethers.utils.hexlify(props.tones3);
//     const myTones = (
//       bigNumber.replace('0x', '') +
//       bigNumber2.replace('0x', '') +
//       bigNumber3.replace('0x', '')
//     ).match(/.{1,6}/g);

//     Tones.forEach((t, i) => {
//       derivedAvatarProps[t] = myTones![i];
//     });

//     console.log(JSON.stringify(derivedAvatarProps));
//     derivedAvatarProps.Background = 3
//     const buff = Buffer.from(JSON.stringify(derivedAvatarProps));
//     console.log(buff.toString('base64'));

//     // console.log(process.env.IMAGE_GENERATOR?.replace("{PROPERTIES}", buff.toString('base64')));
//     const bucket = admin.storage().bucket(`gs://${process.env.storageBucket}`);
//     const file = bucket.file(`nft-images/${image!}.png`);

//     fetch(
//       process.env.IMAGE_GENERATOR?.replace(
//         '{PROPERTIES}',
//         buff.toString('base64')
//       )!
//     )
//       .then((r: any) => {
//         const contentType = r.headers.get('content-type');
//         console.log('loaded data', contentType);
//         const writeStream = file.createWriteStream({
//           metadata: {
//             contentType: 'image/png',
//           },
//         });
//         console.log('piping stream ');
//         r.body.pipe(writeStream);
//         res.status(200).json({ name: `ID is ${image}` });
//       })
//       .catch((e) => {
//         console.log('Failed', e);
//         res.status(404).json({ error: 'not found' });
//       });
//   } catch (e) {
//     console.log(e);
//     res.status(404).json({ error: 'not found' });
//   }
// }


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
}