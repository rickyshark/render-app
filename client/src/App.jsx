import './App.css';
import { useState } from 'react';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function App() {

  const [result, setResult] = useState('');

  return (
    <>
      <div>
        <h1>MERN Render</h1>

        <button onClick={
          async () => {
            const res = await fetch(`${URL}/ping`);
            const data = await res.json();
            setResult(data);
          }
        }>
          Fecha
        </button>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  )
}


export default App
