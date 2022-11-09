import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nav from '../components/Nav';


const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return (<WagmiConfig client={client}>
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
      <Nav/>
    </SessionProvider>
  </WagmiConfig>)

}

export default MyApp
