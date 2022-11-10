
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaHome, FaRegNewspaper, FaShareSquare, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import Wallet from '../Wallet';

const Nft = ({ lite, register }: any) => {
    const { isConnected, address } = useAccount();
    const [meta, setMeta] = useState({} as any)

    useEffect(() => {
        if (!address) {
            return;
        }
        const fetchNft = async () => {
            const nfts = await axios.get(`/api/register/checkNfts?address=${address}`);
            console.log(nfts.data);
            if (!nfts.data.length) {
                // no token!
                setMeta({
                    fake: true,
                    properties: {
                        image: {
                            description: "/images/screens/nft.svg"
                        },
                        name: {
                            description: ""
                        },
                        description: {
                            description: ""
                        }
                    }
                })
                return;
            }
            if (window.location.host.indexOf('localhost') >= 0) {
                const meta = await axios.get(nfts.data[0].tokenUri.replace('https://blue-api.netlify.app', 'http://localhost:3000'));
                console.log(meta);
                setMeta(meta.data);
            }
            else {
                const meta = await axios.get(nfts.data[0].tokenUri);
                console.log(meta);
                setMeta(meta.data);
            }
        }

        fetchNft();

    }, [address]);


    if (Object.keys(meta).length === 0) {
        return <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    }

    return (
        <div className={"card w-96 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white " + (!lite && ' p-4 ') + (lite && ' card-side ')}>
            <div className="rounded">
                {lite && <figure><Image className={lite ? "rounded-l-xl" : "rounded-xl"} height="125" width="125" src={meta.properties.image.description} alt="nft" /></figure>}
                {!lite && <figure><Image height="250" width="350" className="rounded-xl" src={meta.properties.image.description} alt="nft" /></figure>}
                {!lite && <div className="card-body">
                    <h2 className="card-title">{meta.properties.name.description}</h2>
                    <p className="text-xs">{meta.properties.description.description}</p>

                </div>}
            </div>
            {!register && <Wallet lite={lite} />}
        </div>
    )
}

export default Nft
