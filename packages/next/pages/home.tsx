import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    const { address } = useAccount();
    const { push } = useRouter();
    const onConnect = () => {

    }

    const onExplore = () => {
        window.open(`https://testnet.bscscan.com/address/${address}`)
    }

    const onTxn = () => {
        push('/wallet')
    }

    const onAdd = () => {

    }

    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 p-4">

            <div className="flex w-full justify-center items-center">
                <Nft events={{ connect: onConnect, explore: onExplore, txn: onTxn, add: onAdd }} detailed={true} />
            </div>
            <div className="flex w-full">
                <button className='btn btn-primary w-full text-base-100 mt-4'>Connect ORAL-B Toothbrush!</button>
            </div>
        </div>
    )
}

export default Home
