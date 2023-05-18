import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getRoyalty } from '../utils/api.js';

const Royalty = () => {
    const { collectionID } = useParams();
    const [loading, setLoading] = useState(false);
    const [royaltyTotal, setRoyaltyTotal] = useState([]);
    const [selectedDate, setSelectedDate] = useState({ name: '24h', code: 'daily' });
    const [royaltyChartOption, setRoyaltyChartOption] = useState({
        series: [],
        options: {},
    });

    useEffect(async () => {
        const royaltyData = await fetchRoyaltyData(collectionID, selectedDate);
        initialRoyaltyData(royaltyData);
    }, [selectedDate]);

    const fetchRoyaltyData = async (collectionID, date) => {
        setLoading(true);
        const data = await getRoyalty(collectionID, date.code);
        return data;
    };

    const initialRoyaltyData = (marketData) => {
        let series_data = [];
        setRoyaltyTotal(marketData.royaltyTotal)

        for (let index = 0; index < marketData.data.length; index++) {
            const element = marketData.data[index];
            series_data.push({
                x: element.date,
                y: element.royalty
            });
        }

        setRoyaltyChartOption({
            series: [{
                name: 'Royalty',
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
                    text: 'Royalty',
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
                        text: 'Royalty'
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

        setLoading(false);
    }

    return (
        <div className='mx-auto mt-24'>
            <div className='royalty'>
                {loading ?
                    <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <ReactApexChart options={royaltyChartOption.options} series={royaltyChartOption.series} type="area" height={350} />
                }
                <div className='RV-TB flex justify-center my-20'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Total</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>24h</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].total_24h * 1}` : 0}</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].average_24h * 1}` : 0}</td>
                            </tr>
                            <tr>
                                <td>7d</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].total_7d * 1}` : 0}</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].average_7d * 1}` : 0}</td>
                            </tr>
                            <tr>
                                <td>30d</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].total_30d * 1}` : 0}</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].average_30d * 1}` : 0}</td>
                            </tr>
                            <tr>
                                <td>180d</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].total_180d * 1}` : 0}</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].average_180d * 1}` : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Royalty;