import React, { useState, useEffect } from 'react';
import logo from "./assets/logo.png";
import tree from './assets/tree.png';
import leaf from './assets/leaf.png';
import axios from 'axios';

const App = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({ tokens: 0 }); // Initialize user state properly
  const [wallet, setWallet] = useState(0);
  const [userId, setUserId] = useState(872108881);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const userIdFromTelegram = initData.user && initData.user.id;

      if (userIdFromTelegram) {
        localStorage.setItem('username', userIdFromTelegram);
        setUserId(userIdFromTelegram);
      }
    } else {
      const params = new URLSearchParams(window.location.search);
      const userIdFromUrl = params.get('userId');
      if (userIdFromUrl) {
        setUserId(userIdFromUrl);
      }
    }
  }, []);

  useEffect(() => {
    const lastUpdate = localStorage.getItem('lastUpdate');
    const currentBalance = parseInt(localStorage.getItem('balance'), 10) || 0;
    const currentTime = Date.now();

    if (lastUpdate) {
      const elapsedSeconds = Math.floor((currentTime - parseInt(lastUpdate, 10)) / 1000);
      setBalance(currentBalance + elapsedSeconds);
    } else {
      setBalance(currentBalance);
    }

    const interval = setInterval(() => {
      setBalance(prevBalance => {
        const newBalance = prevBalance + 1;
        localStorage.setItem('balance', newBalance);
        localStorage.setItem('lastUpdate', Date.now());
        return newBalance;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.post('https://backend-bloodito-1.onrender.com/user', {
      username: userId
    })
      .then(res => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.error("Error fetching user data!", err);
      });
  }, [userId]);

  const handleClaim = async () => {
    const newWallet = balance + wallet; // Calculate new wallet value
    setWallet(newWallet);
    console.log(newWallet);
    setBalance(0);

    try {
      const res = await axios.post('https://backend-bloodito-1.onrender.com/claim', {
        username: userId,
        tokens: newWallet // Use new wallet value
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error claiming tokens!", err);
    }
  };

  return (
    <>
      <div className='storage'>In Storage :</div>
      <div className='head'>
        <img className='logo' src={logo} alt="logo" />
        <div className='balance'>{balance.toFixed(4)}</div>
      </div>
      <div className='tree'>
        <img src={tree} alt="tree" />
      </div>
      <div className='bag'>
        <img src={leaf} alt="leaf" />
        <div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Storage</div>
          <div>1 hr to fill</div>
          <div>0.02 SEED/hour</div>
        </div>
        <button onClick={handleClaim} id='claim'>Claim</button>
      </div>
      <p>User ID: {userId}</p>
      <p>Total: {user.tokens}</p>
    </>
  );
};

export default App;