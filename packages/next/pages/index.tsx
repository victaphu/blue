import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const getConnector = (metamask: boolean) : any => {
    return metamask ? new MetaMaskConnector() : new Web3AuthConnector({
      options: {
        socialLoginConfig: {
          
        },
        enableLogging: true,
        clientId: 'BK5CIT5-EFcX-v8ST392us0ZV1g2vzrh1Whd9TH2XSkUN4eNDs-UPL1qSfw2iK9-F9cABe9nZpW2ACrlwM-2D70', // Get your own client id from https://dashboard.web3auth.io
        network: 'testnet', // web3auth network
        chainId: '0x61', // chainId that you want to connect with
      },
    })
  }

  const handleAuth = async (metamask = false) => {
    if (isConnected) {
      await disconnectAsync();
    }
    const { account, chain } = await connectAsync({
      connector: getConnector(metamask)
    });

    const userData = { address: account, chain: "0x61", network: 'evm' };
    console.log("Received user data", userData)

    const { data } = await axios.post('/api/auth/request-message', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const message = data.message;

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const result = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/user' });

    if (!result || !result.url || result.error) {
      toast.error(`Failed to sign-in, error was ${result!.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    console.log("Logged in", result);
    // push(url);

    push(result.url)
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image className="mx-auto h-48 w-auto" height='320' width='320' src="/images/screens/splash.svg" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500"> Register a new Account</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />

          <div className="flex flex-col gap-4">
            <button type="button" onClick={e => handleAuth(false)} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Web3 Auth Sign in
            </button>

            <button type="button" onClick={e => handleAuth(true)} className="group relative flex w-full justify-center rounded-md border border-transparent btn-success py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Metamask Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
