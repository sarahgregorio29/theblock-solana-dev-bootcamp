import React from 'react';
// import logo from './logo.svg';
import './App.css';



import CountComponent from './components/CountComponent';

function App() {
  return (
    <div className="App">
       <div>
          <h1 className='text-4x1 font-bold mb-6'>Count Up and Down</h1>
          <CountComponent />
       </div>
    </div>
  );
}

export default App;
