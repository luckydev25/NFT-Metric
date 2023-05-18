import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getPriceImpact } from '../utils/api.js';

function s_downHundred(val) {
    while(Math.abs(val) > 100) {
        val = val / 10;
    }
    return -(Math.abs(val));
}

function b_downHundred(val) {
    while(Math.abs(val) > 100) {
        val = val / 10;
    }
    return (Math.abs(val));
}

const PriceImpact = () => {
    const { collectionID } = useParams();
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState({ name: '24h', code: 'daily' });
    const [spreadChartOption, setSpreadChartOption] = useState({
        series: [],
        options: {},
    });

    useEffect(async () => {
        const data = await fetchData(collectionID, selectedDate);
        initialData(data);

    }, [selectedDate]);

    const fetchData = async (collectionID, date) => {
        setLoading(true);
        const data = await getPriceImpact(collectionID, date.code);
        return data;
    };

    const initialData = (marketData) => {
        let s_series_data1 = [];
        let s_series_data2 = [];
        let s_series_data3 = [];
        let b_series_data1 = [];
        let b_series_data2 = [];
        let b_series_data3 = [];
        // setRoyaltyTotal(marketData.royaltyTotal)

        for (let index = 0; index < marketData.length; index++) {
            const element = marketData[index];
            s_series_data1.push({
                x: element.daily,
                y: element.s_price_impact_1_nft? s_downHundred(element.s_price_impact_1_nft) : element.s_price_impact_1_nft
            });
            s_series_data2.push({
                x: element.daily,
                y: element.s_price_impact_5_nft? s_downHundred(element.s_price_impact_5_nft) : element.s_price_impact_5_nft
            });
            s_series_data3.push({
                x: element.daily,
                y: element.s_price_impact_10_nft? s_downHundred(element.s_price_impact_10_nft) : element.s_price_impact_10_nft
            });
            b_series_data1.push({
                x: element.daily,
                y: element.b_price_impact_1_nft? b_downHundred(element.b_price_impact_1_nft) : element.b_price_impact_1_nft
            });
            b_series_data2.push({
                x: element.daily,
                y: element.b_price_impact_5_nft? b_downHundred(element.b_price_impact_5_nft) : element.b_price_impact_5_nft
            });
            b_series_data3.push({
                x: element.daily,
                y: element.b_price_impact_10_nft? b_downHundred(element.b_price_impact_10_nft) : element.b_price_impact_10_nft
            });
        }

        setSpreadChartOption({
            series: [
                {
                    name: 'Impact of Buying 1 NFT',
                    data: b_series_data1
                },
                {
                    name: 'Impact of Buying 5 NFTs',
                    data: b_series_data2
                },
                {
                    name: 'Impact of Buying 10 NFTs',
                    data: b_series_data3
                },
                {
                    name: 'Impact of Selling 1 NFT',
                    data: s_series_data1
                },
                {
                    name: 'Impact of Selling 5 NFTs',
                    data: s_series_data2,
                },
                {
                    name: 'Impact of Selling 10 NFTs',
                    data: s_series_data3,
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
                        autoSelected: 'zoom',
                    }
                },
                colors: ['#46bdc6', '#ff6d01', '#34a853', '#4285f4', '#ea4335', '#fbbc04'],
                stroke: {
                    width: 2, // set the line width to 4
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'Price Impact',
                    align: 'center'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    title: {
                        text: 'Price Impact'
                    },
                    labels: {
                        formatter: function (val) {
                            if(val)
                                return `${parseInt(val)}%`;
                        }
                    }
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: true,
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
            <div className='spread'>
                {loading ?
                    <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <ReactApexChart options={spreadChartOption.options} series={spreadChartOption.series} type="area" height={350} />
                }
            </div>
        </div>
    )
}

export default PriceImpact;