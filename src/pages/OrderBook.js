import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getOrderBook, getBuyOrderBook, getSellOrderBook } from '../utils/api.js';

const OrderBook = () => {
    const { collectionID } = useParams();
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState({ name: '24h', code: 'daily' });
    const [obChartOption, setOBChartOption] = useState({
        series: [],
        options: {},
    });

    useEffect(async () => {
        const data = await fetchData(collectionID, selectedDate);
        initialData(data);

    }, [selectedDate]);

    const fetchData = async (collectionID, date) => {
        setLoading(true)
        const data = await getOrderBook(collectionID, date.code);
        return data;
    };

    const initialData = (marketData) => {
        console.log(marketData);
        let b_series_data = [];
        let s_series_data = [];
        let prices = [];

        for (let index = 0; index < marketData.buyOrderBook.length; index++) {
            const element = marketData.buyOrderBook[index];
            prices.push(element.price/1000000000);
            b_series_data.push(element.buy_orders);
            s_series_data.push(null);
        }

        const last_price = prices[prices.length - 1];
        for (let index = 0; index < marketData.sellOrderBook.length; index++) {
            const element = marketData.sellOrderBook[index];
            prices.push(last_price + element.price/1000000000);
            s_series_data.push(element.sell_orders);
        }

        setOBChartOption({
            series: [
                {
                    name: 'Buy Orders',
                    data: b_series_data
                },
                {
                    name: 'Sell Orders',
                    data: s_series_data
                }
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                },
                // series,
                stroke: {
                    width: 1, // set the line width to 4
                    // curve: 'stepline',
                },
                title: {
                    text: 'Orderbook',
                    align: 'center'
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                colors: ["#a8d9af", "#ffaeb0"],
                fill: {
                    type: 'solid',
                },
                xaxis: {
                    type: 'numeric', 
                    categories: prices,
                },
                yaxis: {
                    title: {
                        text: 'Orderbook'
                    },
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                    },
                }
            },
        })

        setLoading(false);
    }

    return (
        <div className='mx-auto mt-24'>
            <div className='orderbook'>
                {loading ?
                    <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <ReactApexChart options={obChartOption.options} series={obChartOption.series} type="area" height={350} />
                }
            </div>
        </div>
    )
}

export default OrderBook;