import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    const [txns, setTransactions] = useState([]);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (!isConnected) {
            return;
        }
        const fn = async () => {
            const events = await axios.get(`/api/events/${address}`);
            console.log(events);
        }
        fn();
    }, [])

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


        </div>
    )
}

export default Home
