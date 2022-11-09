import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    const [steps, setSteps] = useState(0);

    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">

                <div className="flex-1 navbar bg-base-100 w-full justify-left items-center">
                    <div className="navbar-start">
                        <div className="btn btn-ghost normal-case text-xl">Blue</div>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center">
                    <Nft />
                </div>
                <div className="text-2xl">
                    Registration Process
                </div>
                <ul className="steps steps-vertical">
                    <li data-content="✓" className={"step " + (steps > 0 && "step-primary")}>Generate Your NFT</li>
                    <li data-content="✓" className={"step " + (steps > 1 && "step-primary")}>Approve Credit Access</li>
                    <li data-content="✓" className={"step " + (steps > 2 && "step-primary")}>Approve Accessories Access</li>
                </ul>
            </div>
        </div>
    )
}

export default Home
