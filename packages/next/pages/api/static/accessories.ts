// a list of accessories as object
import type { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

const ids = [7, 21, 4, 29, 20, 17, 6, 8, 6, 18, 33, 7, 7, 9];
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // return a static object of our accessories data
  // slot (14) each have a set of available equippable accessories
  
  const resultObj = {
  } as any;

  let accId = 0;
  ids.map((id, i) => {
    const prop = Properties[i];
    const length = id;
    resultObj[prop] = [];
    accId ++;
    for (let c = 0; c < length; ++c) {
      resultObj[prop].push({
        slotId: i+1,
        accessoryId: c+1,
        tokenId: accId,
        image: `${process.env.ACCESSORIES_IMAGE_URI}/${accId ++}` 
      })
    }
  })

  res.json(resultObj);
}
