import { useEffect, useState } from 'react';
import './App.css';

import Loader from './components/Loader';

function App() {
  // * userInput amount extractor
  const [userInput, setUserInput] = useState(1);
  // //console.log(userInput);

  // * user's converted value
  const [convertedValue, setConvertedValue] = useState();

  // * from currency
  const [fromCurrency, setFromCurrency] = useState('INR');
  // //console.log(fromCurrency);

  // * to currency
  const [toCurrency, setToCurrency] = useState('USD');
  // //console.log(toCurrency);

  // * loader on loading currency
  const [loading, setLoading] = useState(false);

  // * error handling
  const [error, setError] = useState();

  // ! FECTCH CURRENCY DATA
  useEffect(() => {
    async function currencyConvertor() {
      setLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${userInput}&from=${fromCurrency}&to=${toCurrency}`
      );

      const data = await res.json();
      // //console.log(data.rates[toCurrency]);

      setConvertedValue(data.rates?.[toCurrency]);
      setLoading(false);
    }

    if (fromCurrency === toCurrency) return setConvertedValue(userInput);

    currencyConvertor();
  }, [userInput, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        onChange={(e) => setUserInput(Number(e.target.value))}
        type='number'
        value={!userInput ? '' : userInput}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={loading}
      >
        <option>USD</option>
        <option>EUR</option>
        <option>CAD</option>
        <option>INR</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={loading}
      >
        <option>USD</option>
        <option>EUR</option>
        <option>CAD</option>
        <option>INR</option>
      </select>
      <p>
        converted value:{' '}
        {loading ? (
          <Loader />
        ) : (
          <>{!userInput ? 'Currency not defined' : convertedValue} </>
        )}
      </p>
    </div>
  );
}

export default App;
