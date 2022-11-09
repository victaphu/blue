
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';

const Nav = () => {
  const { isConnected } = useAccount();
  const { push, pathname } = useRouter();

  if (!isConnected || pathname === '/' || pathname === '/register') {
    return <></>
  }

  console.log(pathname)

  return (
    <div className="btm-nav bg-secondary text-white">
      <button className={pathname === '/home' && "active  bg-primary" || ""} onClick={e=>push('/home')}>
        <FaHome />
      </button>
      <button className={pathname === '/marketplace' && "active  bg-primary" || ""} onClick={e=>push('/marketplace')}>
        <FaShoppingCart />
      </button>
      <button className={pathname === '/wallet' && "active  bg-primary" || ""} onClick={e=>push('/wallet')}>
        <FaWallet />
      </button>
      <button className={pathname === '/news' && "active  bg-primary" || ""} onClick={e=>push('/news')}>
        <FaRegNewspaper />
      </button>
    </div>
  )
}

export default Nav
