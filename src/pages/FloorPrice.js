import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SelectButton } from 'primereact/selectbutton';

import Spread from './Spread.js';
import Royalty from './Royalty.js';
import PriceImpact from './PriceImpact.js';
import OrderBook from './OrderBook.js';
import { getFloorPrice } from '../utils/api.js';

const FloorPrice = () => {
    const { collectionID } = useParams();
    const [loading, setLoading] = useState(false);
    const [rbData, setRbData] = useState([]);
    const [selectedDate, setSelectedDate] = useState({ name: '24h', code: 'daily' });
    const [chartOption, setChartOption] = useState({
        series: [],
        options: {},
    });
    const [volumeChartOption, setVolumeChartOption] = useState({
        series: [],
        options: {},
    });

    const dates = [
        { name: '24h', code: 'daily' },
        { name: '7d', code: 'weekly' },
        { name: '30d', code: 'monthly' },
        { name: 'Yearly', code: 'yearly' }
    ];

    useEffect(async () => {
        const data = await fetchData(collectionID, selectedDate);
        initialData(data);
    }, [selectedDate]);

    const fetchData = async (collectionID, date) => {
        setLoading(true)
        const data = await getFloorPrice(collectionID, date.code);
        return data;
    };

    const initialData = (marketData) => {
        let series_data = [];
        let series_volumeData = [];
        setRbData(marketData.RVData)

        for (let index = 0; index < marketData.data.length; index++) {
            const element = marketData.data[index];
            series_data.push({
                x: element.date,
                y: element.floor_price
            });
            series_volumeData.push({
                x: element.date,
                y: element.volume
            });
        }

        setChartOption({
            series: [{
                name: 'Floor Price',
                data: series_data
            }],
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
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'Floor Price',
                    align: 'center'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    title: {
                        text: 'Floor Price'
                    },
                    labels: {
                        formatter: function (val) {
                            return parseInt(val);
                        }
                    }
                },
                xaxis: {
                    type: 'datetime'
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

        setVolumeChartOption({
            series: [{
                name: 'Volume',
                data: series_volumeData
            }],
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
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'Volume',
                    align: 'center'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    title: {
                        text: 'Volume'
                    },
                    labels: {
                        formatter: function (val) {
                            return parseInt(val);
                        }
                    }
                },
                xaxis: {
                    type: 'datetime'
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

        setLoading(false)
    }

    return (
        <div className='mx-auto mt-24'>
            <div>
                <SelectButton className='mb-10' value={selectedDate} onChange={(e) => setSelectedDate(e.value)} optionLabel="name" options={dates} />
                {loading ?
                    <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <div className="grid grid-cols-2 gap-4">
                        <ReactApexChart className="col-span-1" options={chartOption.options} series={chartOption.series} type="area" height={350} />
                        <ReactApexChart className="col-span-1" options={volumeChartOption.options} series={volumeChartOption.series} type="area" height={350} />
                    </div>
                }
                <div className='RV-TB flex justify-center my-20'>
                    <table border="1">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Returns</th>
                                <th>Volume Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>24h</td>
                                <td>{rbData[0] ? `${rbData[0].floor_price_24h * 1}` : 0}</td>
                                <td>{rbData[0] ? `${rbData[0].volume_24h * 1}` : 0}</td>
                            </tr>
                            <tr>
                                <td>7d</td>
                                <td>{rbData[0] ? `${rbData[0].floor_price_7d * 1}` : 0}</td>
                                <td>{rbData[0] ? `${rbData[0].volume_7d * 1}` : 0}</td>
                            </tr>
                            <tr>
                                <td>30d</td>
                                <td>{rbData[0] ? `${rbData[0].floor_price_30d * 1}` : 0}</td>
                                <td>{rbData[0] ? `${rbData[0].volume_30d * 1}` : 0}</td>
                            </tr>
                            <tr>
                                <td>180d</td>
                                <td>{rbData[0] ? `${rbData[0].floor_price_180d * 1}` : 0}</td>
                                <td>{rbData[0] ? `${rbData[0].volume_180d * 1}` : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Royalty />
            </div>
            <div className='royalty'>
                <Spread />
                <PriceImpact />
            </div>
            <div>
                {/* <OrderBook /> */}
            </div>
        </div>
    )
}

export default FloorPrice;