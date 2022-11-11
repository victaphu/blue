import { Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip, Chart as ChartJs, CategoryScale, LinearScale } from 'chart.js';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Line, Radar } from 'react-chartjs-2';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { Toothbrush } from '../common/lib/brush/Toothbrush';
import Nft from '../components/Nft';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

const abi = [
    {
        "inputs": [],
        "name": "claimBlueToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
];

const useRedeem = () => {
    const { config, error: E } = usePrepareContractWrite({
        address: process.env.NEXT_PUBLIC_BLUE_REGISTRAR!,
        abi,
        functionName: "claimBlueToken",
        onError: e => {
            // ignore most likely signature error!
            console.log(e);
        }
    })

    const { data, error, isError, write, isLoading: LOADING, isSuccess: SUCCESS } = useContractWrite(config as any)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return { LOADING, SUCCESS, data, E, error, isError, write, isLoading, isSuccess }
}

const Home: NextPage = () => {
    const { address } = useAccount();
    const { push } = useRouter();
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [chartData, setChartData] = useState({} as any);
    const [raw, setRaw] = useState([]);
    const [currDate, setCurrDate] = useState(new Date());
    const { LOADING, SUCCESS, data, E, error, isError, write, isLoading, isSuccess } = useRedeem();
    const [errorObj, setError] = useState("");

    const { isFetching, refetch } = useBalance({
        addressOrName: address,
        token: process.env.NEXT_PUBLIC_BLUE_20! as any
    });

    useEffect(() => {
        // refresh our token balance!
        if (isSuccess) {
            refetch();
        }
    }, [isSuccess])

    useEffect(() => {
        if (errorObj !== '') {
            console.log("Failed", errorObj);
            toast.error(`Failed to Claim Token, check error logs`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        if (error && isError) {
            console.log("Failed", error);
            toast.error(`Failed to Claim Token, check error logs`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }, [errorObj, error, isError])

    const onConnect = async () => {
        
        try {
            if (connecting) {
                return;
            }

            if (connected) {
                console.log(currDate);
                console.log(raw)
                write?.()
                return;
            }

            const device = await (navigator as any).bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: Toothbrush.services // contains list of GATT services used
            })

            const server = await device.gatt.connect();

            const toothbrush = new Toothbrush(server);

            const rtc = toothbrush.getProperty('rtc')
            if (!await rtc.isAvailable()) {
                // tough luck, we can't query that property
            }
            const date = new Date(await rtc.readValue());

            setCurrDate(date);

            const dataObj = toothbrush.getProperty('data')
            if (!await dataObj.isAvailable()) {
                // tough luck, we can't query that property

                return;
            }
            const last30 = (await dataObj.readValue()).reverse();

            const data = {
                labels: last30.map((x: any, i: number) => i),
                datasets: [
                    {
                        fill: true,
                        data: last30.map((x: any) => +x.duration),
                        backgroundColor: 'purple',
                        borderColor: 'white',
                        borderWidth: 1,
                        pointRadius: 2,
                    },
                ],
            };
            setChartData(data);
            setConnected(true);
            setRaw(last30);
        }
        catch (e) {
            console.log('error', e);
            setError(e + "")
        }
        setConnecting(false);
    }

    const getConnectButton = () => {
        if (connecting) {
            return <>{getIcon()} Connecting to your Toothbrush</>
        }
        else if (isLoading) {
            return <>{getIcon()} Redeeming Token</>
        }
        else if (isSuccess) {
            return "Token Redeemed!"
        }
        else if (connected) {
            return "Redeem Token!"
        }
        return "Connect ORAL-B Toothbrush!"
    }

    const onExplore = () => {
        window.open(`https://testnet.bscscan.com/address/${address}`)
    }

    const onTxn = () => {
        push('/wallet')
    }

    const onAdd = () => {

    }

    const getIcon = () => {
        return (<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>);
    }

    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 p-4">
            <ToastContainer />
            <div className="flex w-full justify-center items-center">
                <Nft events={{ connect: onConnect, explore: onExplore, txn: onTxn, add: onAdd }} detailed={true} />
            </div>
            <div className="flex w-full">
                <button disabled={connecting || isLoading} className={'btn w-full text-base-100 mt-4 ' + (connecting ? ' btn-success ' : ' btn-primary ')} onClick={e => {
                    if (!connected) {
                        setConnecting(true);
                    }

                    onConnect();
                }}>{getConnectButton()}</button>
            </div>
            {Object.keys(chartData).length > 0 && <div className={"card w-full shadow-xl text-white px-4 text-center sm:px-4 lg:px-4 p-4 mt-4"}>
                Toothbrush Analytics
                <Line options={{
                    scales: {
                        // to remove the labels
                        x: {
                            ticks: {
                                display: true,
                            },

                            // to remove the x-axis grid
                            grid: {
                                drawBorder: true,
                                display: true,
                            },
                        },
                        // to remove the y-axis labels
                        y: {
                            beginAtZero: true,
                            ticks: {
                                display: true,
                            },
                            // to remove the y-axis grid
                            grid: {
                                drawBorder: true,
                                display: true,
                            },
                        },
                    }
                }} data={chartData} />
            </div>}
        </div>
    )
}

export default Home
