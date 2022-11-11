import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { Toothbrush } from '../common/lib/brush/Toothbrush';
import Nft from '../components/Nft';

const Home: NextPage = () => {
    const { address } = useAccount();
    const { push } = useRouter();
    const onConnect = async () => {
        // let scan = await navigator.bluetooth.requestLEScan({ acceptAllAdvertisements: true })
        // console.log("Done", scan)
        // console.log('Scan started with:');
        // console.log(' acceptAllAdvertisements: ' + scan.acceptAllAdvertisements);
        // console.log(' active: ' + scan.active);
        // console.log(' keepRepeatedDevices: ' + scan.keepRepeatedDevices);
        // console.log(' filters: ' + JSON.stringify(scan.filters));
        // const Nav = navigator as any;
        // const device = await Nav.bluetooth.requestDevice({
        //     acceptAllDevices: true,
        //     optionalServices: Toothbrush.services
        // })

        // const server = await device.gatt.connect();
        // const toothbrush = new Toothbrush(server);

        // const batteryLife = toothbrush.getProperty('batteryLevel')
        // if (!await batteryLife.isAvailable()) {
        //     console.log("it aint working");
        // }
        // console.log(await batteryLife.readValue());
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
          const currDate = new Date(await rtc.readValue());

          const brushingTime = toothbrush.getProperty('data')
          if (!await brushingTime.isAvailable()) {
            // tough luck, we can't query that property
          }
          const last30 = await brushingTime.readValue();

          console.log(currDate, last30);
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
                <button className='btn btn-primary w-full text-base-100 mt-4' onClick={onConnect}>Connect ORAL-B Toothbrush!</button>
            </div>
        </div>
    )
}

export default Home
