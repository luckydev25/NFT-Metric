import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
        <nav>
            <ul className='flex'>
                <li className='mr-5'>
                    <Link to="/">Home</Link>
                </li>
                <li className='mr-5'>
                    <Link to="/wallet-nft">Wallet NFT</Link>
                </li>
                <li className='mr-5'>
                    <Link to="/whales-buy-index">Whales Buy Index</Link>
                </li>
                <li>
                    <Link to="/past-userbase">Past Userbase</Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navigation;