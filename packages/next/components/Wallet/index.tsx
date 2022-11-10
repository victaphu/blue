
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBluetooth, FaHome, FaRegNewspaper, FaShareAltSquare, FaShareSquare, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';

const Wallet = ({ lite }: any) => {
    const { isConnected, address } = useAccount();
    const [meta, setMeta] = useState({} as any)
    

    // if (Object.keys(meta).length === 0) {
    //     return (<svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    //         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    //     </svg>)
    // }


    return (
        <div className={"w-full bg-purple-700 shadow-xl text-white px-8 py-4 " + (lite ? "rounded-r-xl" : "rounded-xl") }>
            <div className="text-xs">
                Wallet
            </div>
            <div className="text-3xl">
                50.00 BLUE
            </div>
            {!lite && <div className="flex flex-row gap-4 mt-3">
                <button className='text-lg btn btn-primary flex-1'><FaBluetooth className='mr-2'/> Claim</button><button  className='text-lg btn btn-primary flex-1'><FaShareAltSquare className='mr-2'/> Explore</button>
            </div>}
        </div>
    )
}

export default Wallet
