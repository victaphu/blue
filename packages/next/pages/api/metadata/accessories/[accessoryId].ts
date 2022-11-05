// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import admin from 'firebase-admin';

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
const abi1155 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getAccessory',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'slotId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'accessoryId',
            type: 'uint256',
          },
        ],
        internalType: 'struct Blue1155.AccessoryDetails',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const getTemplate = (tokenId: any) => {
  const template = `{
  "title": "Blue Accessories (BLUE)",
  "type": "object",
  "properties": {
      "name": {
          "type": "string",
          "description": "BlueAccessories"
      },
      "description": {
          "type": "string",
          "description": "Accessories to be Equiped for Blue Framework"
      },
      "image": {
          "type": "string",
          "description": "${process.env.ACCESSORIES_IMAGE_URI}/${tokenId}"
      }
  }
}`;
  return JSON.parse(template);
};

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC!);
const contract = new ethers.Contract(process.env.Blue1155!, abi1155, provider);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessoryId } = req.query;

  try {
    const accessory = await contract.getAccessory(accessoryId); // check if the token exists
    if (accessory.slotId.toNumber() === 0) {
      res.status(404).json({"error": "token not found"})
      return
    }
    // proxy the image to the website by first loading the
    // token from the contract (721) decoding the props and
    // then retrieving image
    res.status(200).json(getTemplate(accessoryId));
  }
  catch (e) {
    res.status(404).json({"error": "token not found"});
  }
}


// fixtures loading and caching code
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { image } = req.query;
//     if (typeof image !== 'string') {
//       res.status(433).json({ message: 'invalid arguments' });
//       return;
//     }
//     const accessories = await contract.getAccessory(image!);
//     if (accessories.slotId.toNumber() === 0) {
//       res.status(404).json({ message: 'not found' });
//       return;
//     }
//     console.log(accessories);

//     const url = process.env.ACCESSORIES?.replace(
//       '{SLOT_ID}',
//       Properties[accessories.slotId.toNumber() - 1]
//     ).replace(
//       '{IMAGE_ID}',
//       (accessories.accessoryId.toNumber() - 1).toString()
//     );
//     console.log(url);
//     const bucket = admin.storage().bucket(`gs://${process.env.storageBucket}`);
//     const file = bucket.file(`accessories/${image!}.png`);

//     fetch(url!)
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
//         res.status(200).json({"message": "cached!"});
//       })
//       .catch((e) => {
//         console.log('Failed', e);
//         res.status(404).json({ error: 'not found' });
//       });
//   } catch (e) {
//     res.status(404).json({ error: 'not found' });
//   }
// }
