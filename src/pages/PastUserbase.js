import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getPastUserbase } from '../utils/api.js';

const PastUserbase = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const data = await fetchData();
        setProducts(data);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const data = await getPastUserbase();
        setLoading(false);
        return data;
    };

    const dateFormat1 = (product) => {
        const date = new Date(product.first_purchase_date);
        return <div>{date.toLocaleString()}</div>;
    };

    const dateFormat2 = (product) => {
        const date = new Date(product.last_purchase_date);
        return <div>{date.toLocaleString()}</div>;
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
                        <Column field="royalties_paid" header="Royalties Paid" sortable style={{ width: '20%' }}></Column>
                        <Column body={dateFormat1} header="Date of First NFT purchase" sortable style={{ width: '20%' }}></Column>
                        <Column body={dateFormat2} header="Date of Last NFT purchase" sortable style={{ width: '20%' }}></Column>
                    </DataTable>
                }
            </div>
        </div>
    )
}

export default PastUserbase;