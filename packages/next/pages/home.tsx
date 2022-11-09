import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex-1 navbar bg-base-100 w-full justify-left items-center">
                <div className="navbar-start">
                    <div className="btn btn-ghost normal-case text-xl">Blue - Home</div>
                </div>
            </div>
            <div className="flex w-full justify-center items-center">
                <Nft />
            </div>
        </div>
    )
}

export default Home
