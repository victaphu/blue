import { Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip, Chart as ChartJs, CategoryScale, LinearScale } from 'chart.js';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Line, Radar } from 'react-chartjs-2';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { Toothbrush } from '../common/lib/brush/Toothbrush';
import Nft from '../components/Nft';

const sampleData = [
    {
        "timestamp": 12301246,
        "startTime": "2000-05-22T09:00:46.000Z",
        "duration": 118,
        "eventCount": 1,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 31,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 197,
        "userID": 0
    },
    {
        "timestamp": 12214882,
        "startTime": "2000-05-21T09:01:22.000Z",
        "duration": 121,
        "eventCount": 2,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 35,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 196,
        "userID": 0
    },
    {
        "timestamp": 12128003,
        "startTime": "2000-05-20T08:53:23.000Z",
        "duration": 119,
        "eventCount": 1,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 40,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 195,
        "userID": 0
    },
    {
        "timestamp": 12041924,
        "startTime": "2000-05-19T08:58:44.000Z",
        "duration": 147,
        "eventCount": 2,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 1,
        "finalBatteryState": 45,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 194,
        "userID": 0
    },
    {
        "timestamp": 11956011,
        "startTime": "2000-05-18T09:06:51.000Z",
        "duration": 120,
        "eventCount": 1,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 1,
        "finalBatteryState": 49,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 193,
        "userID": 0
    },
    {
        "timestamp": 11884213,
        "startTime": "2000-05-17T13:10:13.000Z",
        "duration": 61,
        "eventCount": 2,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 54,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 192,
        "userID": 0
    },
    {
        "timestamp": 11840682,
        "startTime": "2000-05-17T01:04:42.000Z",
        "duration": 90,
        "eventCount": 1,
        "mode": 2,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 57,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 191,
        "userID": 0
    },
    {
        "timestamp": 11793193,
        "startTime": "2000-05-16T11:53:13.000Z",
        "duration": 122,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 2,
        "finalBatteryState": 61,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 190,
        "userID": 0
    },
    {
        "timestamp": 11696652,
        "startTime": "2000-05-15T09:04:12.000Z",
        "duration": 152,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 66,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 189,
        "userID": 0
    },
    {
        "timestamp": 11610112,
        "startTime": "2000-05-14T09:01:52.000Z",
        "duration": 127,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 71,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 188,
        "userID": 0
    },
    {
        "timestamp": 11523903,
        "startTime": "2000-05-13T09:05:03.000Z",
        "duration": 122,
        "eventCount": 3,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 76,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 187,
        "userID": 0
    },
    {
        "timestamp": 11496781,
        "startTime": "2000-05-13T01:33:01.000Z",
        "duration": 95,
        "eventCount": 2,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 81,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 186,
        "userID": 0
    },
    {
        "timestamp": 11437391,
        "startTime": "2000-05-12T09:03:11.000Z",
        "duration": 78,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 85,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 185,
        "userID": 0
    },
    {
        "timestamp": 11410080,
        "startTime": "2000-05-12T01:28:00.000Z",
        "duration": 65,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 88,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 184,
        "userID": 0
    },
    {
        "timestamp": 11350823,
        "startTime": "2000-05-11T09:00:23.000Z",
        "duration": 122,
        "eventCount": 3,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 91,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 183,
        "userID": 0
    },
    {
        "timestamp": 11286711,
        "startTime": "2000-05-10T15:11:51.000Z",
        "duration": 70,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 97,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 182,
        "userID": 0
    },
    {
        "timestamp": 11195745,
        "startTime": "2000-05-09T13:55:45.000Z",
        "duration": 137,
        "eventCount": 2,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 9,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 181,
        "userID": 0
    },
    {
        "timestamp": 11152657,
        "startTime": "2000-05-09T01:57:37.000Z",
        "duration": 90,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 1,
        "finalBatteryState": 14,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 179,
        "userID": 0
    },
    {
        "timestamp": 11092479,
        "startTime": "2000-05-08T09:14:39.000Z",
        "duration": 60,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 17,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 178,
        "userID": 0
    },
    {
        "timestamp": 11005825,
        "startTime": "2000-05-07T09:10:25.000Z",
        "duration": 88,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 19,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 177,
        "userID": 0
    },
    {
        "timestamp": 10919411,
        "startTime": "2000-05-06T09:10:11.000Z",
        "duration": 121,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 2,
        "finalBatteryState": 22,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 176,
        "userID": 0
    },
    {
        "timestamp": 10833125,
        "startTime": "2000-05-05T09:12:05.000Z",
        "duration": 84,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 26,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 175,
        "userID": 0
    },
    {
        "timestamp": 10675146,
        "startTime": "2000-05-03T13:19:06.000Z",
        "duration": 87,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 1,
        "finalBatteryState": 30,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 174,
        "userID": 0
    },
    {
        "timestamp": 10635521,
        "startTime": "2000-05-03T02:18:41.000Z",
        "duration": 86,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 35,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 173,
        "userID": 0
    },
    {
        "timestamp": 10581622,
        "startTime": "2000-05-02T11:20:22.000Z",
        "duration": 92,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 5,
        "finalBatteryState": 37,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 172,
        "userID": 0
    },
    {
        "timestamp": 10487992,
        "startTime": "2000-05-01T09:19:52.000Z",
        "duration": 75,
        "eventCount": 2,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 1,
        "finalBatteryState": 41,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 171,
        "userID": 0
    },
    {
        "timestamp": 10401265,
        "startTime": "2000-04-30T09:14:25.000Z",
        "duration": 88,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 1,
        "pressureWarnings": 1,
        "finalBatteryState": 45,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 170,
        "userID": 0
    },
    {
        "timestamp": 10315066,
        "startTime": "2000-04-29T09:17:46.000Z",
        "duration": 131,
        "eventCount": 1,
        "mode": 1,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 48,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 169,
        "userID": 0
    },
    {
        "timestamp": 10228742,
        "startTime": "2000-04-28T09:19:02.000Z",
        "duration": 123,
        "eventCount": 1,
        "mode": 7,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 54,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 168,
        "userID": 0
    },
    {
        "timestamp": 10146543,
        "startTime": "2000-04-27T10:29:03.000Z",
        "duration": 101,
        "eventCount": 1,
        "mode": 7,
        "timeUnderPressure": 0,
        "pressureWarnings": 0,
        "finalBatteryState": 61,
        "totalTargetTime": 120,
        "sector": 4,
        "sessionID": 167,
        "userID": 0
    }
].reverse()

console.log(sampleData)

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
  );


export const data = {
    labels: sampleData.map((x, i) => i),
    datasets: [
        {
            data: sampleData.map((x) => +x.duration),
            backgroundColor: 'purple',
            borderColor: 'white',
            borderWidth: 1,
            
        },
    ],
};


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
            <div className={"card w-full shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 sm:px-6 lg:px-8 p-4 mt-4"}>
        
                <Line options={{
                    scales: {
                        xAxes: [{
                          display: true,
                          gridLines: {
                            display: false
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Month'
                          }
                        }],
                        yAxes: [{
                          display: true,
                          gridLines: {
                            display: false
                          },
                          scaleLabel: {
                            display: true,
                            labelString: 'Value'
                          }
                        }]
                      }
                }} data={data} />
            </div>
        </div>
    )
}

export default Home
