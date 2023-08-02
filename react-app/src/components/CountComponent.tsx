import React, { useState } from 'react';

const CountComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return  (
    <div>
      <h2>Count: {count}</h2>
      <div>
        <button
          onClick={handleIncrement}
        >
          Increament
        </button>
        <button
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default CountComponent;