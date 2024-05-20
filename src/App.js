import React, { useState, useEffect } from 'react';
import logo from "./assets/logo.png"
import tree from './assets/tree.png'
const App= () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Get the last update time from localStorage
    const lastUpdate = localStorage.getItem('lastUpdate');
    const currentBalance = parseInt(localStorage.getItem('balance'), 10) || 0;
    const currentTime = Date.now();

    if (lastUpdate) {
      const elapsedSeconds = Math.floor((currentTime - parseInt(lastUpdate, 10)) / 1000);
      setBalance(currentBalance + elapsedSeconds);
    } else {
      setBalance(currentBalance);
    }

    // Update the balance every second
    const interval = setInterval(() => {
      setBalance(prevBalance => {
        const newBalance = prevBalance + 1;
        localStorage.setItem('balance', newBalance);
        localStorage.setItem('lastUpdate', Date.now());
        return newBalance;
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>

    <div className='storage'>In Storage :</div>
    <div className='head'>
      <img className='logo' src={logo}></img>
      <div className='balance'>{balance}</div>
    </div>
    <div className='tree' >
    <img src={tree}>
    </img>
    </div>

    </>
  );
};

export default App;


