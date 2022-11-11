import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, configureChains, defaultChains, WagmiConfig, Chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import Nav from '../components/Nav';

const bsbTestNet : Chain = {
  id: 0x61,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s3.binance.org:8545", //"https://bsctestapi.terminet.io/rpc",
    public: "https://data-seed-prebsc-1-s3.binance.org:8545	", //https://bsctestapi.terminet.io/rpc",
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://testnet.bscscan.com/',
    },
    default: {
      name: 'Etherscan',
      url: 'https://testnet.bscscan.com/',
    },
  },
  testnet: true,
}

const { provider, webSocketProvider } = configureChains([bsbTestNet], [publicProvider()]);

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
