// В App.tsx
import { useState } from 'react';
function App() {
  const [cookies, setCookies] = useState(0);
  return (
    <div>
      <h1>Печеньки: {cookies}</h1>
      <button onClick={() => setCookies(cookies + 1)}>
        🍪 Кликни!
      </button>
    </div>
  );
}