import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getOrderBook } from '../utils/api.js';

const OrderBook = () => {
    const { collectionID } = useParams();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState({ name: '24h', code: 'daily' });
    const [obChartOption, setOBChartOption] = useState({
        series: [],
        options: {},
    });

    useEffect(async () => {
        const data = await fetchData(collectionID, selectedDate);
        setOrders(data);
        // initialData(data);

    }, [selectedDate]);

    const fetchData = async (collectionID, date) => {
        setLoading(true)
        const data = await getOrderBook(collectionID, date.code);
        setLoading(false)
        return data;
    };

    const prepareChartData = () => {
        const buyOrders = orders.filter((order) => order.type === 'Bid');
        const sellOrders = orders.filter((order) => order.type === 'Sale');
    
        const buyOrderData = buyOrders.reduce((acc, order) => {
          const { price, hour } = order;
          const key = `${price}`;
    
          if (acc[key]) {
            acc[key] += 1; // Assuming 1 quantity per order, adjust accordingly
          } else {
            acc[key] = 1;
          }
    
          return acc;
        }, {});
    
        const sellOrderData = sellOrders.reduce((acc, order) => {
          const { price, hour } = order;
          const key = `${price}`;
    
          if (acc[key]) {
            acc[key] += 1; // Assuming 1 quantity per order, adjust accordingly
          } else {
            acc[key] = 1;
          }
    
          return acc;
        }, {});
    
        const prices = [...new Set([...Object.keys(buyOrderData), ...Object.keys(sellOrderData)])];
    
        const series = [
          {
            name: 'Buy Orders',
            data: prices.map((price) => buyOrderData[price] || 0),
          },
          {
            name: 'Sell Orders',
            data: prices.map((price) => sellOrderData[price] || 0),
          },
        ];
    
        return {
          prices,
          series,
        };
      };
    
      const { prices, series } = prepareChartData();

      const chartOptions = {
        chart: {
          type: 'area',
          height: 350,
        },
        series,
        stroke: {
            width: 1, // set the line width to 4
            // curve: 'stepline',
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        colors: ["#a8d9af", "#ffaeb0"],
        xaxis: {
          categories: prices,
        },
        yaxis: {
            axisTicks: {
                show: true
            },
            axisBorder: {
                show: true,
            },
        }
      };

    const initialData = (marketData) => {
        let b_series_data = [];
        let s_series_data = [];
        // setRoyaltyTotal(marketData.royaltyTotal)

        for (let index = 0; index < marketData.length; index++) {
            const element = marketData[index];
            if(element.type == 'Bid') {
                b_series_data.push({
                    x: element.hour,
                    y: element.price
                });
            } else {
                s_series_data.push({
                    x: element.hour,
                    y: element.price
                });
            }
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
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                stroke: {
                    width: 2, // set the line width to 4
                    curve: 'stepline',
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'OrderBook',
                    align: 'center'
                },
                fill: {
                    // colors: ['#E91E63', '#9C27B0']
                },
                yaxis: {
                    title: {
                        text: 'OrderBook'
                    },
                    labels: {
                        formatter: function (val) {
                            return `${parseInt(val)}`;
                        }
                    }
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: false,
                    x: {
                        formatter: function (val) {
                            return new Date(val).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
                        }
                    }
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
                    <ReactApexChart options={chartOptions} series={series} type="area" height={350} />
                }
            </div>
        </div>
    )
}

export default OrderBook;