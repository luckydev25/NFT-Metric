import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link
} from "react-router-dom";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       

import Layout from '../components/Layout';
import Home from '../pages/Home';
import FloorPrice from '../pages/FloorPrice';
import WalletNFT from '../pages/WalletNFT';
import WhalesBuyIndex from '../pages/WhalesBuyIndex';
import PastUserbase from '../pages/PastUserbase';

const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/floor-price/:collectionID" element={<FloorPrice />} />
                    <Route path="/wallet-nft" element={<WalletNFT />} />
                    <Route path="/whales-buy-index" element={<WhalesBuyIndex />} />
                    <Route path="/past-userbase" element={<PastUserbase />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;