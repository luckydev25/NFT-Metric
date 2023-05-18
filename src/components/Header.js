import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <header className='my-4'>
            {/* <img src={logo} alt="Xcelvations Logo" height="40" /> */}
            <Link to="/">
                <h1 className='text-2xl font-medium'>Metric Dashboard</h1>
            </Link>
        </header>
    );
};

export default Header;