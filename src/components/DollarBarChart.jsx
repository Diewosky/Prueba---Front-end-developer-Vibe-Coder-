import React, { useState, useEffect } from 'react';
import { getDollarSeries } from '../services/api';
import { formatDate } from '../utils/helpers';
import Button from './Button';
import './DollarBarChart.css';

const DollarBarChart = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDollarSeries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDollarSeries();
      setSeriesData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos del dólar. Por favor, intente nuevamente.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDollarSeries();
  }, []);

  const calculateBarHeight = (value) => {
    if (seriesData.length === 0) return 0;
    
    // Find min and max values to scale the chart appropriately
    const values = seriesData.map(item => item.valor);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    
    // Calculate percentage height (5% minimum for visibility)
    const range = maxValue - minValue;
    const percentage = range === 0 
      ? 100 // If all values are the same
      : 5 + ((value - minValue) / range) * 95;
    
    return percentage;
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const renderChart = () => {
    if (loading) {
      return <div className="loading">Cargando datos del gráfico...</div>;
    }
    
    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
          <Button 
            text="Intentar Nuevamente" 
            onClick={fetchDollarSeries} 
            type="primary"
          />
        </div>
      );
    }
    
    if (seriesData.length === 0) {
      return <div className="empty-state">No hay datos disponibles para el gráfico.</div>;
    }

    return (
      <div className="chart-area">
        <div className="y-axis">
          {[...Array(5)].map((_, i) => {
            const values = seriesData.map(item => item.valor);
            const minValue = Math.min(...values);
            const maxValue = Math.max(...values);
            const range = maxValue - minValue;
            const value = maxValue - (range * i / 4);
            return (
              <div key={i} className="y-axis-label">
                ${value.toFixed(2)}
              </div>
            );
          })}
        </div>
        
        <div className="chart">
          {seriesData.map((item, index) => {
            const barHeight = calculateBarHeight(item.valor);
            
            return (
              <div className="bar-container" key={index}>
                <div 
                  className="bar-tooltip"
                >
                  ${item.valor.toFixed(2)}
                  <br />
                  {formatDate(item.fecha)}
                </div>
                <div 
                  className="bar" 
                  style={{ height: `${barHeight}%` }}
                  title={`${formatDate(item.fecha)}: $${item.valor.toFixed(2)}`}
                ></div>
                <div className="x-axis-label">
                  {index % 3 === 0 ? formatShortDate(item.fecha) : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id="dollar-chart" className="barchart-container card-container">
      <h2>Valor del Dólar - Últimos 30 días</h2>
      {renderChart()}
    </div>
  );
};

export default DollarBarChart; 