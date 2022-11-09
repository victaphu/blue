import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = ['animals', 'arch', 'nature', 'people', 'tech']

const Home: NextPage = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        let getNews = async () => {
            const articles = await axios.get(`/api/feed/dental`);
            setNews(articles.data);
            console.log(articles.data);
        }
        getNews();
    }, [])

    return (
        <div className="flex flex-col min-h-full items-center justify-left px-4 sm:px-6 lg:px-8">
            <div className="navbar bg-base-100 w-full">
                <div className="navbar-start">
                    <div className="btn btn-ghost normal-case text-xl">Blue - News</div>
                </div>
            </div>
            {news.length === 0 && <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
            <div className="flex flex-col gap-4 w-full mb-24">
                {news.map((n: any, i) => {
                    return (<div key={i} className="card bg-base-100 shadow-xl border">
                        <figure><Image height="225" width="400" src={`https://placeimg.com/400/225/${images[i % images.length]}`} alt="car!" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{n.short}</h2>
                            <p className="text-xs">{n.desc}</p>
                            <div className="card-actions justify-end">
                                <a className="link" onClick={e => window.open(n.href)}>Read More</a>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default Home
