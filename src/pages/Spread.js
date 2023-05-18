import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ProgressSpinner } from 'primereact/progressspinner';

import { getSpread } from '../utils/api.js';

const Spread = () => {
    const { collectionID } = useParams();
    const [loading, setLoading] = useState(false);
    const [royaltyTotal, setRoyaltyTotal] = useState([]);
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
        const data = await getSpread(collectionID, date.code);
        return data;
    };

    const initialData = (marketData) => {
        let series_data = [];
        // setRoyaltyTotal(marketData.royaltyTotal)

        for (let index = 0; index < marketData.length; index++) {
            const element = marketData[index];
            while(element.spread_percent > 100) {
                element.spread_percent = element.spread_percent / 10;
            }
            series_data.push({
                x: element.date,
                y: element.spread_percent
            });
        }

        setSpreadChartOption({
            series: [{
                name: 'Spreads',
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
                    text: 'Spreads',
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
                        text: 'Spreads'
                    },
                    labels: {
                        formatter: function (val) {
                            return `${parseInt(val)}%`;
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
            <div className='spread'>
                {loading ?
                    <ProgressSpinner className='custom-spinner' strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" /> :
                    <ReactApexChart options={spreadChartOption.options} series={spreadChartOption.series} type="area" height={350} />
                }
                {/* <div className='RV-TB flex justify-center my-20'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Spread</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>24h</td>
                                <td>{royaltyTotal[0] ? `${royaltyTotal[0].total_24h * 1}`  : 0}</td>
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
                </div> */}
            </div>
        </div>
    )
}

export default Spread;