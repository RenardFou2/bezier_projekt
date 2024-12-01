import React, { useState } from 'react';
import BezierCanvas from './components/BezierCanvas';
import ControlPanel from './components/ControlPanel';

function App() {
  const [points, setPoints] = useState([
    { x: 100, y: 300 },
    { x: 300, y: 100 },
    { x: 500, y: 300 },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <h1>Krzywa Béziera</h1>
        <BezierCanvas points={points} setPoints={setPoints} />
      </div>
      <ControlPanel points={points} setPoints={setPoints} />
    </div>
  );
}

export default App;
