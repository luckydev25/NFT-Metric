import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getWhalesBuyIndex } from '../utils/api.js';

const WhalesBuyIndex = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const data = await fetchData();
        setProducts(data);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const data = await getWhalesBuyIndex();
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
                        <Column field="wallet" header="All Wallets" sortable style={{ width: '20%' }}></Column>
                        <Column field="most_bought" header="Most Bought" sortable style={{ width: '20%' }}></Column>
                        <Column field="most_sold" header="Most Sold" sortable style={{ width: '20%' }}></Column>
                        <Column field="nfts_bought" header="NFT Bought" sortable style={{ width: '20%' }}></Column>
                        <Column field="nfts_sold" header="NFT Sold" sortable style={{ width: '20%' }}></Column>
                    </DataTable>
                }
            </div>
        </div>
    )
}

export default WhalesBuyIndex;