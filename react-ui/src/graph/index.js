import React from 'react';
import CustomBarChart from './barchart';
import CustomScatterChart from './scatterchart';

const Graph = ({ type, apiData, avg, chartFor, title }) => {
    const renderChart = () => {
        switch (type) {
            case 'Dev Focus':
                return <CustomBarChart title={title} />;
            case 'Lead Time':
            case 'Cycle Time':
                return <CustomScatterChart apiData={apiData} avg={avg} chartFor={chartFor} title={title} />;
            default:
                return <div>Please select a chart type</div>;
        }
    };

    return (
        <div>
            {renderChart()}
        </div>
    );
};

export default Graph;
