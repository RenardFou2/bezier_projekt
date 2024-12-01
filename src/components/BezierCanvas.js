import React, { useRef, useEffect } from 'react';

const BezierCanvas = ({ points, setPoints }) => {
  const canvasRef = useRef(null);

  const calculateBezierPoint = (t, points) => {
    const n = points.length - 1;
    let result = { x: 0, y: 0 };
    for (let i = 0; i <= n; i++) {
      const binomial = factorial(n) / (factorial(i) * factorial(n - i));
      const coefficient = binomial * Math.pow(1 - t, n - i) * Math.pow(t, i);
      result.x += coefficient * points[i].x;
      result.y += coefficient * points[i].y;
    }
    return result;
  };

  const factorial = (num) => (num <= 1 ? 1 : num * factorial(num - 1));

  const drawBezier = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.strokeStyle = 'lightgray';
    ctx.beginPath();
    points.forEach((p, index) => {
      if (index === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    for (let t = 0; t <= 1; t += 0.01) {
      const { x, y } = calculateBezierPoint(t, points);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = 'red';
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  useEffect(() => {
    drawBezier();
  }, [points]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedPoint = points.find((p) =>
      Math.hypot(p.x - mouseX, p.y - mouseY) < 10
    );
    if (clickedPoint) {
      const onMouseMove = (e) => {
        clickedPoint.x = e.clientX - rect.left;
        clickedPoint.y = e.clientY - rect.top;
        setPoints([...points]);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      style={{ border: '1px solid black' }}
    />
  );
};

export default BezierCanvas;
