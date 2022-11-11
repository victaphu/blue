import axios from 'axios';
import { ethers } from 'ethers';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import Nft from '../components/Nft';
import IBlue20 from "../common/abis/IBlue20.json"
import IBlue721 from "../common/abis/IBlue721.json"
import IBlue1155 from "../common/abis/IBlue1155.json"
import IBlueAvatar from "../common/abis/IBlueAvatar.json"
import BlueRegistrar from "../common/abis/BlueRegistrar.json"
import 'react-toastify/dist/ReactToastify.css';

const ADDRESSES = {
} as any
ADDRESSES[process.env.NEXT_PUBLIC_BLUE_20!.toLowerCase()] = 'Blue20'
ADDRESSES[process.env.NEXT_PUBLIC_BLUE_721!.toLowerCase()] = 'Blue721'
ADDRESSES[process.env.NEXT_PUBLIC_BLUE_1155!.toLowerCase()] = 'Blue1155'
ADDRESSES[process.env.NEXT_PUBLIC_BLUE_AVATAR!.toLowerCase()] = 'BlueAvatar'
ADDRESSES[process.env.NEXT_PUBLIC_BLUE_REGISTRAR!.toLowerCase()] = 'BlueRegistrar'

const abis = {
    Blue20: IBlue20,
    Blue721: IBlue721,
    Blue1155: IBlue1155,
    BlueAvatar: IBlueAvatar,
    BlueRegistrar,
} as any;

const Home: NextPage = () => {
    const [txns, setTransactions] = useState([]);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) {
            return;
        }
        const fn = async () => {
            const events = await axios.get(`/api/events/${address}`);
            setTransactions(events.data
                .filter((e: any) => ADDRESSES[e.from] || ADDRESSES[e.to])
                .map((e: any) => {
                    console.log(e, ADDRESSES[e.from] || ADDRESSES[e.to])
                    const iface = new ethers.utils.Interface(abis[ADDRESSES[e.from] || ADDRESSES[e.to]].abi);
                    try {
                        let decodedData = iface.parseTransaction({ data: e.data, value: e.value });
                        e.fnName = decodedData?.name || e.data.substring(0, 8);
                    } catch (ex) {
                        // ignore
                        e.fnName = e.data.substring(0, 8);
                    }
                    e.from = ADDRESSES[e.from] || 'MyWallet'
                    e.to = ADDRESSES[e.to] || 'MyWallet'

                    return e
                })
            )
        }
        fn();
    }, [])

    console.log("txns", txns, ADDRESSES)

    return (
        <div className="flex flex-col min-h-full items-center justify-left">
            <div className="flex-1 navbar bg-base-100 w-full justify-left items-center sticky bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white ">
                <div className="navbar-start">
                    <div className="btn btn-ghost normal-case text-xl">Blue - Transactions</div>
                </div>
            </div>
            <div className="flex w-full justify-center items-center px-4 sm:px-6 lg:px-8 pt-4">
                <Nft lite={true} />
            </div>

            <div className="flex w-full justify-left items-center px-4 sm:px-6 lg:px-8 pt-6 text-white text-lg font-bold">
                Transactions
            </div>

            <div className="overflow-x-auto mt-2">
                <table className="table table-compact table-zebra w-full">
                    <thead className='text-sm'>
                        <tr>
                            <th className='bg-purple-700 text-white'>#</th>
                            <th className='bg-purple-700 text-white'>From</th>
                            <th className='bg-purple-700 text-white'>To</th>
                            <th className='bg-purple-700 text-white'>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txns.map((tx: any, i) => {
                            return <tr key={i} className='text-xs'>
                                <td className='text-sm link text-blue-500' onClick={e => window.open(`https://testnet.bscscan.com/tx/${tx.hash}`)}>{tx.nonce}</td>
                                <td className='text-sm'>{tx.from}</td>
                                <td className='text-sm'>{tx.to}</td>
                                <td className='text-sm'><span className='badge w-full'>{tx.fnName}</span></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
