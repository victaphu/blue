import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 p-4">
            
            <div className="flex w-full justify-center items-center">
                <Nft />
            </div>
            <div className="flex w-full">
                <button className='btn btn-success w-full text-white mt-4'>Connect ORAL-B Toothbrush!</button>
            </div>
        </div>
    )
}

export default Home
