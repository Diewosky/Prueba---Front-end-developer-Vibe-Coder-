import React, { useState, useEffect } from 'react';
import { getAllIndicators, getIndicatorValue, getHistoricalIndicatorValue, getIndicatorByYear } from '../services/api';
import { formatDate } from '../utils/helpers';
import Button from './Button';
import './DollarValue.css';

const DollarValue = () => {
  const [indicatorData, setIndicatorData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [compareResult, setCompareResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [compareError, setCompareError] = useState(null);
  const [availableIndicators, setAvailableIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState('dolar');
  const [compareIndicator, setCompareIndicator] = useState('dolar');
  const [comparisonType, setComparisonType] = useState('date'); // 'date' o 'year'
  const [yearData, setYearData] = useState(null);

  const fetchIndicators = async () => {
    try {
      const allData = await getAllIndicators();
      // Filter out non-indicators (like version, autor, fecha)
      const indicators = Object.keys(allData).filter(key => 
        typeof allData[key] === 'object' && allData[key] !== null && 'codigo' in allData[key]
      );
      setAvailableIndicators(indicators);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchIndicatorValue = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIndicatorValue(selectedIndicator);
      setIndicatorData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(`Error al obtener el valor del ${selectedIndicator}. Por favor, intente nuevamente.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, []);

  useEffect(() => {
    if (selectedIndicator) {
      fetchIndicatorValue();
      // Reset comparison data when indicator changes
      resetComparisonData();
    }
  }, [selectedIndicator]);

  useEffect(() => {
    // Inicialmente, el indicador de comparación es el mismo que el indicador principal
    setCompareIndicator(selectedIndicator);
  }, [selectedIndicator]);

  const resetComparisonData = () => {
    setHistoricalData(null);
    setYearData(null);
    setCompareResult(null);
    setCompareError(null);
    setSelectedDate('');
    setSelectedYear('');
    setComparing(false);
  };

  const cleanupComparisonStates = () => {
    resetComparisonData();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Reset comparison data when date changes
    setHistoricalData(null);
    setCompareResult(null);
    setCompareError(null);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    // Reset comparison data when year changes
    setYearData(null);
    setCompareResult(null);
    setCompareError(null);
  };

  const handleIndicatorChange = (e) => {
    setSelectedIndicator(e.target.value);
  };

  const handleCompareIndicatorChange = (e) => {
    setCompareIndicator(e.target.value);
    // Reset comparison data when indicator changes
    resetComparisonData();
  };

  const handleComparisonTypeChange = (e) => {
    setComparisonType(e.target.value);
    resetComparisonData();
  };

  const compareByDate = async () => {
    if (!selectedDate) {
      alert('Por favor, seleccione una fecha');
      return;
    }

    try {
      // Limpiar estados previos antes de iniciar una nueva consulta
      setHistoricalData(null);
      setCompareResult(null);
      setComparing(true);
      setCompareError(null);
      
      // Verificar que la fecha no sea un fin de semana o feriado
      const selectedDateTime = new Date(selectedDate);
      const dayOfWeek = selectedDateTime.getDay();
      
      // Si es sábado (6) o domingo (0), mostrar un mensaje más específico
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setCompareError('La fecha seleccionada corresponde a un fin de semana. Por favor, seleccione un día hábil.');
        setComparing(false);
        return;
      }

      // Intentar obtener los datos históricos con un timeout para evitar esperas largas
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Tiempo de espera agotado')), 60000) // 60 segundos (1 minuto)
      );
      
      const dataPromise = getHistoricalIndicatorValue(compareIndicator, selectedDate);
      
      // Race entre el timeout y la petición real
      const data = await Promise.race([dataPromise, timeoutPromise]);
      
      // Verificar que se recibieron datos válidos
      if (!data || !data.valor) {
        setCompareError(`No hay datos disponibles para ${compareIndicator.toUpperCase()} en la fecha seleccionada. Intente con otra fecha.`);
        setComparing(false);
        return;
      }
      
      setHistoricalData(data);

      // Compare values
      if (indicatorData && data) {
        try {
          compareValues(data.valor);
        } catch (err) {
          console.error('Error al comparar valores:', err);
          setCompareError('Error al procesar los datos de comparación. Por favor, intente nuevamente.');
        }
      } else {
        setCompareError('Datos insuficientes para realizar la comparación. Por favor, intente nuevamente.');
      }
      setComparing(false);
    } catch (err) {
      console.error(err);
      setComparing(false);
      setHistoricalData(null); // Limpiar datos históricos en caso de error
      
      // Mensajes de error más específicos
      if (err.message === 'Tiempo de espera agotado') {
        setCompareError('La consulta está tomando demasiado tiempo. Por favor, intente más tarde.');
      } else if (err.response && err.response.status === 404) {
        setCompareError(`No se encontraron datos para ${compareIndicator.toUpperCase()} en la fecha seleccionada.`);
      } else {
        setCompareError('Error al obtener datos históricos. Por favor, intente con otra fecha o indicador.');
      }
    }
  };

  const compareByYear = async () => {
    if (!selectedYear) {
      alert('Por favor, ingrese un año');
      return;
    }

    const year = parseInt(selectedYear);
    const currentYear = new Date().getFullYear();
    
    if (year < 2000 || year > currentYear) {
      setCompareError(`Por favor, ingrese un año entre 2000 y ${currentYear}`);
      return;
    }

    try {
      // Limpiar estados previos antes de iniciar una nueva consulta
      setYearData(null);
      setCompareResult(null);
      setComparing(true);
      setCompareError(null);

      // Timeout más largo para consultas por año que suelen retornar más datos
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Tiempo de espera agotado')), 90000) // 90 segundos (1.5 minutos)
      );
      
      const dataPromise = getIndicatorByYear(compareIndicator, selectedYear);
      
      const yearResponse = await Promise.race([dataPromise, timeoutPromise]);
      
      // Verificar que se recibieron datos válidos
      if (!yearResponse || !yearResponse.serie || yearResponse.serie.length === 0) {
        setCompareError(`No hay datos disponibles para ${compareIndicator.toUpperCase()} en el año ${selectedYear}.`);
        setComparing(false);
        return;
      }
      
      setYearData(yearResponse);

      // Calcular promedio anual para comparación
      try {
        const yearValues = yearResponse.serie.map(item => item.valor);
        const averageValue = yearValues.reduce((sum, value) => sum + value, 0) / yearValues.length;
        
        // Comparar con el valor actual
        if (indicatorData) {
          compareValues(averageValue);
        } else {
          setCompareError('No se pudo obtener el valor actual para la comparación.');
        }
      } catch (err) {
        console.error('Error al calcular promedio:', err);
        setCompareError('Error al procesar los datos anuales. Por favor, intente nuevamente.');
      }
      
      setComparing(false);
    } catch (err) {
      console.error(err);
      setComparing(false);
      setYearData(null); // Limpiar datos de año en caso de error
      
      if (err.message === 'Tiempo de espera agotado') {
        setCompareError('La consulta está tomando demasiado tiempo. Por favor, intente más tarde.');
      } else if (err.response && err.response.status === 404) {
        setCompareError(`No se encontraron datos para ${compareIndicator.toUpperCase()} en el año ${selectedYear}.`);
      } else {
        setCompareError(`Error al obtener datos del año ${selectedYear}. Por favor, intente con otro año o indicador.`);
      }
    }
  };

  const compareValues = (historicalValue) => {
    try {
      if (!indicatorData || !indicatorData.valor || historicalValue === undefined || historicalValue === null) {
        throw new Error('Datos insuficientes para la comparación');
      }
      
      const currentValue = indicatorData.valor;
      
      if (currentValue > historicalValue) {
        setCompareResult({
          status: 'increased',
          difference: (currentValue - historicalValue).toFixed(2),
          percentage: (((currentValue - historicalValue) / historicalValue) * 100).toFixed(2)
        });
      } else if (currentValue < historicalValue) {
        setCompareResult({
          status: 'decreased',
          difference: (historicalValue - currentValue).toFixed(2),
          percentage: (((historicalValue - currentValue) / historicalValue) * 100).toFixed(2)
        });
      } else {
        setCompareResult({
          status: 'unchanged',
          difference: 0,
          percentage: 0
        });
      }
    } catch (err) {
      console.error('Error en la comparación de valores:', err);
      throw err; // Re-lanzar el error para manejarlo en la función que llama
    }
  };

  const handleCompare = () => {
    // Limpiar resultados previos antes de iniciar una nueva comparación
    setCompareResult(null);
    
    if (comparisonType === 'date') {
      compareByDate();
    } else {
      compareByYear();
    }
  };

  const renderComparisonResult = () => {
    if (compareError) {
      return (
        <div className="comparison-error error">
          <p>{compareError}</p>
          <Button 
            text="Intentar Nuevamente" 
            onClick={handleCompare} 
            type="primary"
          />
        </div>
      );
    }

    if (!(historicalData || yearData) || !compareResult) return null;

    try {
      // Valor a mostrar
      let valueToShow = 0;
      let dateDisplay = '';
      let comparedIndicatorName = '';
      let unitDisplay = 'CLP'; // Default a CLP
      
      if (comparisonType === 'date' && historicalData) {
        valueToShow = historicalData.valor || 0;
        dateDisplay = formatDate(historicalData.fecha || new Date());
        comparedIndicatorName = historicalData.nombre || compareIndicator.toUpperCase();
        
        // Formatear unidad si está disponible
        if (historicalData.unidad_medida) {
          unitDisplay = historicalData.unidad_medida.toLowerCase() === 'pesos' ? 'CLP' : historicalData.unidad_medida;
        }
      } else if (comparisonType === 'year' && yearData) {
        // Calcular promedio con verificación
        if (yearData.serie && yearData.serie.length > 0) {
          const values = yearData.serie.map(item => item.valor || 0);
          valueToShow = values.length > 0 
            ? values.reduce((sum, val) => sum + val, 0) / values.length 
            : 0;
        }
        dateDisplay = `promedio de ${selectedYear}`;
        comparedIndicatorName = yearData.nombre || compareIndicator.toUpperCase();
        
        // Formatear unidad si está disponible
        if (yearData.unidad_medida) {
          unitDisplay = yearData.unidad_medida.toLowerCase() === 'pesos' ? 'CLP' : yearData.unidad_medida;
        }
      }

      // Verificar que tenemos datos válidos antes de renderizar
      if (!comparedIndicatorName) {
        return (
          <div className="comparison-error error">
            <p>No se pudieron obtener datos válidos para la comparación.</p>
            <Button 
              text="Intentar Nuevamente" 
              onClick={handleCompare} 
              type="primary"
            />
          </div>
        );
      }

      return (
        <div className={`comparison-result ${compareResult.status}`}>
          <div className="historical-value">
            <div className="value-label">Valor {comparedIndicatorName} {dateDisplay}:</div>
            <div className="value-amount">${valueToShow.toFixed(2)} <span className="currency-code-small">{unitDisplay}</span></div>
          </div>
          <div className="comparison-message">
            {comparedIndicatorName} ha {compareResult.status === 'increased' ? 'aumentado' : 
             compareResult.status === 'decreased' ? 'disminuido' : 'mantenido'} en 
             ${compareResult.difference} ({compareResult.percentage}%) en comparación con {dateDisplay}
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error al renderizar resultados de comparación:", error);
      return (
        <div className="comparison-error error">
          <p>Ocurrió un error al mostrar los resultados. Por favor, intente nuevamente.</p>
          <Button 
            text="Intentar Nuevamente" 
            onClick={handleCompare} 
            type="primary"
          />
        </div>
      );
    }
  };

  const renderCurrentValue = () => {
    if (loading) {
      return <div className="loading">Cargando valor actual...</div>;
    }
    
    if (error) {
      return (
        <div className="error">
          <p>{error}</p>
          <Button 
            text="Intentar Nuevamente" 
            onClick={fetchIndicatorValue} 
            type="primary"
          />
        </div>
      );
    }

    if (!indicatorData) {
      return <div className="empty-state">No hay datos disponibles.</div>;
    }

    // Formatear la unidad de medida
    let unitDisplay = indicatorData.unidad_medida;
    if (unitDisplay && unitDisplay.toLowerCase() === "pesos") {
      unitDisplay = "CLP";
    }

    return (
      <div className="dollar-card">
        <div className="dollar-amount">
          <span className="currency">$</span>
          <span className="value">{indicatorData.valor.toFixed(2)}</span>
          <span className="currency-code">{unitDisplay}</span>
        </div>
        <div className="dollar-date">
          Última actualización: {formatDate(indicatorData.fecha)}
        </div>
      </div>
    );
  };

  const renderComparisonInputs = () => {
    if (comparisonType === 'date') {
      return (
        <input 
          type="date" 
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
          max={new Date().toISOString().split('T')[0]}
          disabled={loading || !!error}
        />
      );
    } else {
      const currentYear = new Date().getFullYear();
      return (
        <input 
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          className="year-input"
          placeholder="Ej: 2022"
          min="2000"
          max={currentYear}
          disabled={loading || !!error}
        />
      );
    }
  };

  // Agregar función de limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpiar todos los estados cuando el componente se desmonta
      cleanupComparisonStates();
    };
  }, []);

  return (
    <>
      <div id="dollar-value" className="dollar-value-card card-container">
        <div className="indicator-selector">
          <label htmlFor="indicator-select">Seleccionar Indicador: </label>
          <select 
            id="indicator-select" 
            value={selectedIndicator} 
            onChange={handleIndicatorChange}
            className="indicator-select"
            disabled={loading || availableIndicators.length === 0}
          >
            {availableIndicators.map(indicator => (
              <option key={indicator} value={indicator}>
                {indicator.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <h2>Valor Actual del {indicatorData ? indicatorData.nombre : 'Indicador'}</h2>
        {renderCurrentValue()}
      </div>

      <div id="historical-comparison" className="comparison-card card-container">
        <h2>Comparar con valor histórico</h2>
        
        <div className="indicator-selector comparison-indicator-selector">
          <label htmlFor="compare-indicator-select">Moneda a comparar: </label>
          <select 
            id="compare-indicator-select" 
            value={compareIndicator} 
            onChange={handleCompareIndicatorChange}
            className="indicator-select"
            disabled={loading || availableIndicators.length === 0}
          >
            {availableIndicators.map(indicator => (
              <option key={indicator} value={indicator}>
                {indicator.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div className="comparison-type-selector">
          <label>
            <input 
              type="radio" 
              name="comparisonType" 
              value="date"
              checked={comparisonType === 'date'}
              onChange={handleComparisonTypeChange}
            />
            Por fecha específica
          </label>
          <label>
            <input 
              type="radio" 
              name="comparisonType" 
              value="year"
              checked={comparisonType === 'year'}
              onChange={handleComparisonTypeChange}
            />
            Por año
          </label>
        </div>
        
        <div className="date-input-container">
          {renderComparisonInputs()}
          <button 
            className="compare-button" 
            onClick={handleCompare}
            disabled={comparing || 
              (comparisonType === 'date' && !selectedDate) || 
              (comparisonType === 'year' && !selectedYear) || 
              loading || 
              !!error}
          >
            {comparing ? 'Comparando...' : 'Comparar'}
          </button>
        </div>
        
        {renderComparisonResult()}
      </div>
    </>
  );
};

export default DollarValue; 