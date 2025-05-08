import React, { useState, useEffect } from 'react';
import { getDollarValue } from '../services/api';
import Button from './Button';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [dollarRate, setDollarRate] = useState(null);
  const [clpAmount, setClpAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDollarRate = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDollarValue();
      setDollarRate(data.valor);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al obtener el tipo de cambio. Por favor, intente nuevamente.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDollarRate();
  }, []);

  const handleClpChange = (e) => {
    const clp = e.target.value;
    setClpAmount(clp);
    
    // Only convert if we have a value and a dollar rate
    if (clp && dollarRate) {
      const usd = (Number(clp) / dollarRate).toFixed(2);
      setUsdAmount(usd);
    } else {
      setUsdAmount('');
    }
  };

  const handleUsdChange = (e) => {
    const usd = e.target.value;
    setUsdAmount(usd);
    
    // Only convert if we have a value and a dollar rate
    if (usd && dollarRate) {
      const clp = (Number(usd) * dollarRate).toFixed(0);
      setClpAmount(clp);
    } else {
      setClpAmount('');
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Cargando tipo de cambio...</div>;
    }
    
    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
          <Button 
            text="Intentar Nuevamente" 
            onClick={fetchDollarRate} 
            type="primary"
          />
        </div>
      );
    }

    if (!dollarRate) {
      return <div className="empty-state">Datos de tipo de cambio no disponibles.</div>;
    }

    return (
      <>
        <div className="current-rate">
          <span>Tipo de Cambio Actual: </span>
          <span className="rate-value">1 USD = {dollarRate.toFixed(2)} CLP</span>
        </div>

        <div className="converter-form">
          <div className="input-group">
            <label htmlFor="clp-input">Peso Chileno (CLP)</label>
            <div className="input-with-symbol">
              <span className="currency-symbol">$</span>
              <input
                id="clp-input"
                type="number"
                value={clpAmount}
                onChange={handleClpChange}
                placeholder="Ingrese monto en CLP"
                className="currency-input"
              />
            </div>
          </div>

          <div className="arrow-icon">⇄</div>

          <div className="input-group">
            <label htmlFor="usd-input">Dólar Estadounidense (USD)</label>
            <div className="input-with-symbol">
              <span className="currency-symbol">$</span>
              <input
                id="usd-input"
                type="number"
                value={usdAmount}
                onChange={handleUsdChange}
                placeholder="Ingrese monto en USD"
                className="currency-input"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div id="currency-converter" className="converter-container card-container">
      <h2>Conversor de Moneda</h2>
      {renderContent()}
    </div>
  );
};

export default CurrencyConverter; 