
import Image from 'next/image';
import { FaHome, FaRegNewspaper, FaShoppingCart, FaWallet } from 'react-icons/fa';

const Nft = () => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><Image height="250" width="250" src="/images/screens/nft.svg" /></figure>
            <div className="card-body">
                <h2 className="card-title">Hemlock Hawkrider</h2>
                <p className="text-xs">This meadow-dwelling fairy is female with dark brown eyes, a pale complexion, and straight red hair left uncut.  She is very tall and is quite muscular.  She wears a pair of long trousers, a short dress, and a pair of pointed shoes.  She also wears a mid-length jacket, a silver pendant, and a jeweled brooch.  She tends to be forgetful and is fairly athletic.</p>
                
            </div>
        </div>
    )
}

export default Nft
