import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nft from '../components/Nft';

// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex-1 navbar bg-base-100 w-full">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">Blue</a>
                </div>
            </div>
            <div className="flex w-full">
                <Nft />
            </div>

            <div className="flex w-full">
                <button className='btn btn-success w-full text-white mt-2'>Connect Toothbrush!</button>
            </div>

            

            <div className="btm-nav">
                <button>
                    <FaHome />
                </button>
                <button>
                    <FaRegNewspaper />
                </button>
                <button className="active">
                    <FaShoppingCart />
                </button>
                <button>
                    <FaWallet />
                </button>
            </div>
        </div>
    )
}

export default Home
