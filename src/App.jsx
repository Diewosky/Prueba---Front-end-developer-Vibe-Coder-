import DollarValue from './components/DollarValue'
import DollarBarChart from './components/DollarBarChart'
import CurrencyConverter from './components/CurrencyConverter'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <h1>InfoDivisas</h1>
        
        <section id="dollar-value" className="app-section">
          <DollarValue />
        </section>
        
        <section id="currency-converter" className="app-section">
          <CurrencyConverter />
        </section>
        
        <section id="dollar-chart" className="app-section">
          <DollarBarChart />
        </section>
      </div>
    </>
  )
}

export default App
