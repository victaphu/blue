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
      privateKey: process.env.private_key?.replace(/\\n/g, '\n'),
      clientEmail: process.env.client_email,
    }),
  });
} catch (e) {
  admin.app();
}

// erc721 - get metadata from the nft directly
const abi721 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
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
        indexed: false,
        internalType: 'struct AvatarProps',
        name: 'created',
        type: 'tuple',
      },
    ],
    name: 'AvatarCreated',
    type: 'event',
  },
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

/*
 logs: [{
    logIndex: '11',
    transactionHash: '0x8bf41fd7aa1ee741356fac75b0f173c5256f713ccb7193445afe858dbd97a21b',
    address: '0xcf77266ace6189e6befbd576b219642b860c5eb1',
    data: '0x0000000000000000000000008b150251127e6fdd6e67b98d9557ba1e396cedcd00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000052fa8b78c47e96dcbac194800003c208e69b5bb40df3052f90d00c12f8cc7c5e19c64a754a285b95a93735f00009ec71d09451ea9196a85353ceee25142cc72e68f99c07090df955e585e3e00000000000000000000003ceba103ee6f3db1ebee1f5d0398a9622c786278e3',
    topic0: '0x4718adeb82263f7dcfce77c321611759fd496dbc379891cb3de73b94509e773a',
    topic1: null,
    topic2: null,
    topic3: null
  }
]
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Processing - nfts minted!', req.body);
  if (!req.body.confirmed || !req.body.logs || req.body.logs.length === 0) {
    res.json({ message: 'ok - not confirmed' });
    return;
  }

  const logs = req.body.logs[0];
  if (!logs.topics) {
    logs.topics = [];
    for (let i = 0; i < 10; ++i) {
      if (logs['topic' + i]) {
        logs.topics.push(logs['topic' + i]);
      } else {
        break;
      }
    }
  }

  const avatarCreated = contract.interface.parseLog(logs);
  // avatarCreated is owner, tokenId, created
  console.log('Avatar Created', avatarCreated);

  const tokenId = avatarCreated.args.tokenId;
  if (tokenId) {
    try {
      // console.log(await contract.ownerOf(image!)); // check if the token exists
      const props = await contract.getProps(tokenId);

      // proxy the image to the website by first loading the
      // token from the contract (721) decoding the props and
      // then retrieving image

      console.log('Loaded props from blockchain', props);
      const paddedProps = (
        new Array(Properties.length * 2).fill('0').join('') +
        props.stats.toString()
      ) // props.stats.toString()
        .slice(-Properties.length * 2)
        .match(/.{1,2}/g);

      console.log(paddedProps);

      const derivedAvatarProps = {} as any;

      Properties.forEach((p, i) => {
        if (+paddedProps![i] > 0) {
          derivedAvatarProps[p] = (+paddedProps![i] - 1).toString();
        }
      });

      const bigNumber = ethers.utils.hexlify(props.tones1);
      const bigNumber2 = ethers.utils.hexlify(props.tones2);
      const bigNumber3 = ethers.utils.hexlify(props.tones3);
      const myTones = (
        bigNumber.replace('0x', '') +
        bigNumber2.replace('0x', '') +
        bigNumber3.replace('0x', '')
      ).match(/.{1,6}/g);

      Tones.forEach((t, i) => {
        derivedAvatarProps[t] = myTones![i];
      });

      console.log(JSON.stringify(derivedAvatarProps));
      const buff = Buffer.from(JSON.stringify(derivedAvatarProps));
      console.log(buff.toString('base64'));

      // console.log(process.env.IMAGE_GENERATOR?.replace("{PROPERTIES}", buff.toString('base64')));
      const bucket = admin
        .storage()
        .bucket(`gs://${process.env.storageBucket}`);
      const file = bucket.file(`nft-images/${tokenId.toString()}.png`);

      fetch(
        process.env.IMAGE_GENERATOR?.replace(
          '{PROPERTIES}',
          buff.toString('base64')
        )!
      )
        .then((r: any) => {
          const contentType = r.headers.get('content-type');
          console.log('loaded data', contentType);
          const writeStream = file.createWriteStream({
            metadata: {
              contentType: 'image/png',
            },
          });
          console.log('piping stream ');
          r.body.pipe(writeStream);
          res.status(200).json({ name: `ID is ${tokenId.toString()}` });
        })
        .catch((e) => {
          console.log('Failed', e);
          res.status(404).json({ error: 'not found' });
        });
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: 'not found' });
    }
  } else {
    res.json({ message: 'ok but token id not found' });
  }
}
