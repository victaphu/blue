// https://www.ada.org.au/News-Media/Latest-News

// a list of accessories as object
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
require('dotenv').config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const site = await fetch('https://www.ada.org.au/News-Media/Latest-News')
    const txt = await site.text()
    
    const start = txt.indexOf("<li class=\"clearfix\">")
    const end = txt.indexOf("</ul>", start)
    const news = txt.substring(start, end).split('li ')

    console.log(news.length)

    const obj = news.map(e=>{
        if (e.indexOf('div') < 0) return null;
        let i = e.indexOf('story-img')
        i = e.indexOf('<img', i)
        const img = e.substring(e.indexOf('src="', i), e.indexOf('" alt', i)).replace('src="', "")
        i = e.indexOf('story-content', i)
        i = e.indexOf('<a href="', i)
        const href = e.substring(i + 9, e.indexOf('">', i))
        i = e.indexOf('<p>')
        const desc = e.substring(i + 3, e.indexOf('</p>', i)).trim()
        i = e.indexOf('<i class="flaticon')
        let time = e.substring(i, e.indexOf('</p>', i))
        time = time.substring(time.indexOf('</i>') + 4).trim()
        return {image: "https://www.ada.org.au" + img, href: "https://www.ada.org.au" + href, desc, time}
    }).filter(e=>e)


    res.json(obj);
//   res.json(resultObj);
}
