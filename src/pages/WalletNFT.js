import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getWalletNFTData } from '../utils/api.js';

const WalletNFT = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const data = await fetchData();
        setProducts(data);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const data = await getWalletNFTData();
        setLoading(false);
        return data;
    };

    return (
        <div>
            <div className="my-20 card">
                {loading? <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <DataTable 
                        value={products}  
                        sortOrder={-1}
                        paginator 
                        rows={50} 
                        rowsPerPageOptions={[50, 100, 200]} 
                        paginatorPosition="top"
                    >
                        <Column field="wallet" header="All Wallets" sortable style={{ width: '16.666%' }}></Column>
                        <Column field="nfts_added" header="NFTs Added - For Collection" sortable style={{ width: '16.666%' }}></Column>
                        <Column field="nfts_sold" header="NFTs Sold - For Collection" sortable style={{ width: '16.666%' }}></Column>
                        <Column field="most_collection_bought" header="Most Collection Bought" sortable style={{ width: '16.666%' }}></Column>
                        <Column field="most_collection_sold" header="Most Collection Sold" sortable style={{ width: '16.666%' }}></Column>
                        <Column field="royalties_paid" header="Royalties Paid" sortable style={{ width: '16.666%' }}></Column>
                    </DataTable>
                }
            </div>
        </div>
    )
}

export default WalletNFT;