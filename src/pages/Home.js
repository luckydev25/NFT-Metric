import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getNFTData } from '../utils/api.js';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        const data = await fetchData();
        setProducts(data);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const data = await getNFTData();
        setLoading(false);
        return data;
    };

    const collectionLink = (product) => {
        return <Link to={`/floor-price/${product.collection_id}`}>{product.collection_id}</Link>;
    };

    return (
        <div>
            <div className="my-20 card">
                {loading?  
                    <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <DataTable 
                        value={products}  
                        sortField={'volume'}
                        sortOrder={-1}
                        paginator 
                        rows={50} 
                        rowsPerPageOptions={[50, 100, 200]} 
                        tableStyle={{ minWidth: '50rem' }}
                        paginatorPosition="top"
                    >
                        <Column header="Collection" body={collectionLink} sortable style={{ width: '50%' }}></Column>
                        <Column field="floor_price" header="Floor Price" sortable style={{ width: '25%' }}></Column>
                        <Column field="volume" header="Volume" sortable style={{ width: '25%' }}></Column>
                    </DataTable>
                }
            </div>
        </div>
    )
}

export default Home;