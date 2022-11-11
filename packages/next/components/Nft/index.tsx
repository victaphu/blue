
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBluetoothB, FaHome, FaNotesMedical, FaPlus, FaRegNewspaper, FaShareSquare, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import useStickyState from '../../utils/useStickyState';
import Wallet from '../Wallet';

const Nft = ({ lite, register, detailed, events }: any) => {
    const { isConnected, address } = useAccount();
    
    const [meta, setMeta] = useState({} as any)

    const [cached, setCached] = useStickyState(null, 'blueNfts');

    useEffect(() => {
        console.log('cached, ', cached)
        if (!address || !cached) {
            return;
        }
        const fetchNft = async () => {
            try {
                if (cached[address]) {
                    setMeta(cached[address])
                    return;
                }
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
                    cached[address] = meta.data;
                    setCached({...cached});
                }
                else {
                    const meta = await axios.get(nfts.data[0].tokenUri);
                    console.log(meta);
                    setMeta(meta.data);

                    cached[address] = meta.data;
                    setCached({...cached});
                }
            }
            catch (e) {
                console.log("Failed", e);
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
            }
        }

        fetchNft();

    }, [address, cached]);

    useEffect(() => {
        if (!cached && !window.localStorage.getItem('blueNfts')) {
            setCached({})
        }
    }, [cached])


    if (Object.keys(meta).length === 0) {
        return <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    }

    return (
        <div className={"card w-96 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white " + (!lite && ' p-3 ') + (lite && ' card-side ')}>
            {detailed && <div className={"card w-full shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white card-side "}>
                <figure><img className="rounded-l-xl w-28 " height="125" width="125" src={meta.properties.image.description} alt="nft" /></figure>
                {!register && <Wallet lite={lite || detailed} />}
            </div>}
            <div className={"rounded " + (detailed && " pt-8")}>
                {register && <figure><img height="250" width="350" className="w-40 rounded-xl" src={meta.properties.image.description} alt="nft" /></figure>}

                {lite && <figure><img className={"w-24 " + (lite ? "rounded-l-xl" : "rounded-xl")} height="125" width="125" src={meta.properties.image.description} alt="nft" /></figure>}
                {/* {detailed && <figure><img height="250" width="350" className="rounded-xl" src={meta.properties.image.description} alt="nft" /></figure>} */}
                {detailed && <div className="card-body p-2">
                    <h2 className="card-title">{meta.properties.name.description}</h2>
                    <p className="text-xs">{meta.properties.description.description}</p>
                </div>}
            </div>
            {!detailed && !register && <Wallet lite={lite} />}
            {detailed && <div className="flex flex-row gap-4 pt-8">
                <div className="flex flex-1 flex-col justify-center items-center"><button onClick={events?.connect} className="text-xl btn rounded-2xl bg-[#C17BE7] glass mb-1"><FaBluetoothB /></button><span className='text-xs'>Connect</span></div>
                <div className="flex flex-1 flex-col justify-center items-center"><button onClick={events?.add} className="text-xl flex-1 btn rounded-2xl bg-[#C17BE7] glass mb-1"><FaPlus /></button><span className='text-xs'>Add</span></div>
                <div className="flex flex-1 flex-col justify-center items-center"><button onClick={events?.explore} className="text-xl flex-1 btn rounded-2xl bg-[#C17BE7] glass mb-1"><FaShareSquare /></button><span className='text-xs'>Explore</span></div>
                <div className="flex flex-1 flex-col justify-center items-center"><button onClick={events?.txn} className="text-xl flex-1 btn rounded-2xl bg-[#C17BE7] glass mb-1"><FaNotesMedical /></button><span className='text-xs'>Txns</span></div>
            </div>}
        </div>
    )
}

export default Nft
