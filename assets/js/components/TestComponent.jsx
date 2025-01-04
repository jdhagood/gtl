import React from 'react';

const TestComponent = ({ title }) => {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>If you see this, React is working!</p>
    </div>
  );
};

export default TestComponent;