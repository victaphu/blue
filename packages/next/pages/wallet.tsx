import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    return (
        <div className="flex flex-col min-h-full items-center justify-left">
            <div className="flex-1 navbar bg-base-100 w-full justify-left items-center sticky bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white ">
                <div className="navbar-start">
                    <div className="btn btn-ghost normal-case text-xl">Blue - Transactions</div>
                </div>
            </div>
            <div className="flex w-full justify-center items-center px-4 sm:px-6 lg:px-8 pt-4">
                <Nft lite={true}/>
            </div>

            <div className="flex w-full px-4 sm:px-6 lg:px-8 py-2">
                <button className='btn btn-success w-full text-white mt-2'>Connect Toothbrush!</button>
            </div>

            

           
        </div>
    )
}

export default Home
