import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import Nft from '../components/Nft';
import 'react-toastify/dist/ReactToastify.css';

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

const abis = {
    blue20: [{
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },],
    blue1155: [{
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },],
    // blue721: [],
    // blueAvatar: [],
    blueRegistrar: [{
        "inputs": [
            {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }]
}

const useContractWriter = (args: any, functionName: string, address: string, abi: any) => {
    const { config, error: E } = usePrepareContractWrite({
        address,
        abi,
        functionName,
        args,
        onError: e => {
            // ignore most likely signature error!
        }
    })

    const { data, error, isError, write, isLoading: LOADING, isSuccess: SUCCESS } = useContractWrite(config as any)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return { LOADING, SUCCESS, data, E, error, isError, write, isLoading, isSuccess }
}

const Home: NextPage = () => {
    const [steps, setSteps] = useState(0);
    const { isConnected, address } = useAccount();
    const { push } = useRouter();
    const [registered, setRegistered] = useState('')
    const debouncedRegistered: any = useDebounce(registered, 500)
    const [error, setError] = useState('');

    const stepHandlers: any = {
        0: useContractWriter([debouncedRegistered], 'registerUser', process.env.NEXT_PUBLIC_BLUE_REGISTRAR!, abis.blueRegistrar),
        // approve 10k blue tokens for spending on blue 1155
        1: useContractWriter([process.env.NEXT_PUBLIC_BLUE_1155, 10000], 'approve', process.env.NEXT_PUBLIC_BLUE_20!, abis.blue20),
        // approve blue avatar to manage 1155 for user (equip / unequip)
        2: useContractWriter([process.env.NEXT_PUBLIC_BLUE_AVATAR, true], 'setApprovalForAll', process.env.NEXT_PUBLIC_BLUE_1155!, abis.blue1155)
    }

    useEffect(() => {
        if (error !== '') {
            console.log("Failed", error);
            toast.error(`Failed to register, check error logs`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setSteps(0);
        }
    }, [error])

    useEffect(() => {
        if (!address || address === '0x') {
            return;
        }
        const f = async () => {
            const d = await axios.get(`/api/register/${address}`);
            console.log(d);
            setRegistered(d.data.verified)
        }
        f();
    }, [address]);

    useEffect(() => {
        if (steps === 0 || !stepHandlers[steps - 1]) return;
        
        if (stepHandlers[steps - 1].isError) {
            setError(stepHandlers[steps - 1].error);
        }
        else if (stepHandlers[steps - 1].isSuccess) {
            switch(steps) {
                case 1:
                    console.log("Processing step 1")
                    approveBlue20();
                    break;
                case 2:

                    console.log("Processing step 2")
                    approveBlue1155();
                    break;
                case 3:

                    console.log("Processing completed")
                    completed();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepHandlers, steps])

    console.log(stepHandlers)

    const getTitle = () => {
        switch (steps) {
            case 1:
                return 'Generating NFT'
            case 2:
                return 'Approving Tokens'
            case 3:
                return 'Approving Accessories'
            case 4:
                return 'Success!'
            default:
                return 'Start Registration'
        }
    }

    const getIcon = () => {
        if (steps > 0 && steps < 4) {
            return (<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>)
        }

        if (steps === 4) {
            return <FaHome />
        }

        return <FaCheckCircle />
    }

    const generateNft = async () => {
        
        console.log("STEPS", steps)
        if (steps === 4) {
            push('/home');
            return;
        }
        if (steps !== 0) return;
        // get approval to submit txn
        // ask user to submit txn to register
        // call approve 20
        console.log('processed 0', stepHandlers[0].write)
        stepHandlers[0].write?.()
        console.log('step moving forward')
        setSteps(1);
    }

    const approveBlue20 = async () => {
        // call approve on the smart contract
        console.log('processed 1')
        await stepHandlers[1].write?.()
        setSteps(2);
    }

    const approveBlue1155 = async () => {
        // call approve on the smart contract
        console.log('processed 2')
        await stepHandlers[2].write?.()
        setSteps(3);
    }

    const completed = () => {
        // completed! user to click to continue; the UI should update with the new token about now...
        setSteps(4);
    }

    return (
        <div className="flex flex-col min-h-full items-center justify-center">
            <ToastContainer />
            <div className="w-full max-w-md space-y-4">

                <div className="navbar bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full mb-4 top-0 glass sticky z-50">
                    <div className="navbar-start">
                        <div className="btn btn-ghost normal-case text-xl">Welcome to Blue!</div>
                    </div>
                </div>
                <div className="flex w-full flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                    <Nft register={true} />
                </div>
                <div className="text-2xl px-4 sm:px-6 lg:px-8 text-base-100">
                    <button className={"btn w-full text-base-100 " + (steps === 0 || steps === 4 ? "btn-success" : "btn")} onClick={generateNft} ><span className='mr-2'>{getIcon()}</span> {getTitle()}</button>
                    <p className='color-base-300 text-sm mt-2'><b>To begin lets create a free NFT! </b>We will prompt you to sign 3 signatures to redeem your free Fairy Token. Click Start Registration to begin</p>
                </div>
                <ul className="steps steps-vertical text-base-100 px-4 sm:px-6 lg:px-8">
                    <li data-content="✓" className={"step " + (steps > 0 && "step-primary")}>Generate Your NFT</li>
                    <li data-content="✓" className={"step " + (steps > 1 && "step-primary")}>Approve Credit Access</li>
                    <li data-content="✓" className={"step " + (steps > 2 && "step-primary")}>Approve Accessories Access</li>
                </ul>
            </div>
        </div>
    )
}

export default Home
