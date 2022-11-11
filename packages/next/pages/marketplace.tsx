import axios from 'axios';
import type { NextPage } from 'next'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Nft from '../components/Nft';


const Home: NextPage = () => {
    const [accessories, setAccessories] = useState({} as any);
    const [selected, setSelected] = useState(0);
    const [selectedPurchase, setSelectedPurchase] = useState(0);
    
    useEffect(() => {
        let getAccessories = async () => {
            const articles = await axios.get(`/api/static/accessories`);
            setAccessories(articles.data);
            console.log(articles.data);
        }
        getAccessories();
    }, [])

    console.log(selectedPurchase)

    return (
        <div className="flex flex-col min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 p-4">

            {Object.keys(accessories).length === 0 && <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
            {Object.keys(accessories).length > 0 && <>
                <div className="flex w-full justify-center items-center">
                    <Nft lite={true} />
                </div>
                <div className='overflow-scroll px-2 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl my-4'>
                    <div className="pt-2 text-center font-bold text-xl">Accessories</div>
                    <div className='flex flex-wrap flex-row gap-2 my-4'>
                        {Object.keys(accessories).map((k: string, i) => {
                            const a = accessories[k][1];
                            return (<div key={i} className={'rounded-full bg-base-300 bg-base-200 shadow-xl w-12 h-12 overflow-hidden ' + (selected === i && 'border border-2 border-black')} ><img key={i} width='50' height='50' onClick={e => {setSelected(i); setSelectedPurchase(-1)}} alt="accessories" src={a.image} /></div>)
                        })}
                    </div>
                </div></>
            }
            <div className="shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl p-2 w-full items-center justify-center flex flex-col">
                <div className="pb-2 text-center font-bold text-lg">{Object.keys(accessories)[selected]}</div>
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        accessories[Object.keys(accessories)[selected]]?.map((a: any, i: any) => {
                            return <div key={i} className={'rounded-full bg-base-300 bg-base-200 overflow-hidden shadow-xl w-12 h-12 ' + (selectedPurchase === i && 'border border-2 border-black')}><img width='50' height='48' onClick={e => setSelectedPurchase(i)} alt="selected accessories" src={a.image} /></div>
                        })
                    }
                </div>
            </div>
            <div className="w-full pb-24 pt-4">
                <button type="button" disabled={selectedPurchase < 0} className={"group relative flex w-full justify-center rounded-md border border-transparent btn py-2 px-4 text-sm font-medium text-white " + (selectedPurchase < 0 ? "bg-gray-200" : "btn-primary")}>
                    Buy
                </button>
            </div>
        </div>
    )
}

export default Home
