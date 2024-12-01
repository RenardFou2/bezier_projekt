import React, { useState } from 'react';

const ControlPanel = ({ points, setPoints }) => {
  const [newPoint, setNewPoint] = useState({ x: '', y: '' });

  const handleInputChange = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index][axis] = parseFloat(value) || 0;
    setPoints(newPoints);
  };

  const handleNewPointChange = (axis, value) => {
    setNewPoint({ ...newPoint, [axis]: value });
  };

  const addNewPoint = () => {
    const x = parseFloat(newPoint.x);
    const y = parseFloat(newPoint.y);
    if (!isNaN(x) && !isNaN(y)) {
      setPoints([...points, { x, y }]);
      setNewPoint({ x: '', y: '' });
    } else {
      alert('Wprowadź poprawne wartości dla x i y');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Kontrola punktów</h2>
      {points.map((point, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <label>Punkt {index + 1}: </label>
          <input
            type="number"
            value={point.x}
            onChange={(e) => handleInputChange(index, 'x', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="number"
            value={point.y}
            onChange={(e) => handleInputChange(index, 'y', e.target.value)}
          />
        </div>
      ))}
      <h3>Dodaj nowy punkt</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>X: </label>
        <input
          type="number"
          value={newPoint.x}
          onChange={(e) => handleNewPointChange('x', e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <label>Y: </label>
        <input
          type="number"
          value={newPoint.y}
          onChange={(e) => handleNewPointChange('y', e.target.value)}
        />
      </div>
      <button onClick={addNewPoint} style={{ marginTop: '10px' }}>
        Dodaj punkt
      </button>
    </div>
  );
};

export default ControlPanel;
