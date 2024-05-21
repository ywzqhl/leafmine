import React, { useState, useEffect } from 'react';
import logo from "./assets/logo.png";
import tree from './assets/tree.png';
import boost from './assets/boost.png'
import refer from './assets/ecologist.png'
import mission from './assets/target.png'
import walle from './assets/wallet.png'
import leaf from './assets/leaf.png';


import { Outlet, Link } from "react-router-dom";

import axios from 'axios';


const App = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({ tokens: 0 }); // Initialize user state properly
  const [wallet, setWallet] = useState(0);
  // const [userId, setUserId] = useState();
  const [total, setTotal] = useState(0);
  


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

    const to = localStorage.getItem('wall');
    setTotal(to);

    const currentBalance = parseInt(localStorage.getItem('balance'), 10) || 0;
    const currentTime = Date.now();

    if (lastUpdate) {
      const elapsedSeconds = Math.floor((currentTime - parseInt(lastUpdate, 10)) / 1000);
      setBalance(currentBalance + elapsedSeconds *0.0002);

      setBalance(currentBalance + elapsedSeconds);

    } else {
      setBalance(currentBalance);
    }

    const interval = setInterval(() => {
      setBalance(prevBalance => {

      
        
        const newBalance = prevBalance + 0.0002;
        localStorage.setItem('balance', newBalance);
        localStorage.setItem('lastUpdate', Date.now());
        return newBalance;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  // useEffect(() => {
  //   const use = localStorage.getItem('username');
  //   console.log(use)
  //   setUserId(use)
  //   axios.post('https://backend-bloodito-1.onrender.com/user',{
  //     username:use
  //   })
  //     .then(res => {
  //       console.log(res.data)
  //       setUser(res.data);
  //       // setIsLoaded(false); 
  //  // set loading to false after fetching the data
  //     })
  //     .catch(err => {
  //       // Handle the error here (for example, show a toast notification)
  //       // toast.error("Error fetching user data!"); 
  //       // setIsLoaded(false); 
  //   // even if there's an error, we should set loading to false
    
  //     });

  // }, [user]);
  // const handleClaim = async () => {
  //   setWallet(balance+total)
  //   console.log(wallet)
  //   localStorage.setItem('wall',total);
   
    // setBalance(0)
    // try{
    //   const res = await axios.post('https://backend-bloodito-1.onrender.com/claim',{
    //     username:userId,
    //     tokens:wallet
    //   });
    //   console.log(res.data);
    //   // setWallet(res.data[46].tokens);
    // }
    // catch(err){
    //   console.log(err)
    // }
    
    
// =======
//   useEffect(() => {
//     axios.post('https://backend-bloodito-1.onrender.com/user', {
//       username: userId
//     })
//       .then(res => {
//         console.log(res.data);
//         setUser(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching user data!", err);
//       });
//   }, [userId]);

  const handleClaim = async () => {
    const newWallet = balance + wallet; // Calculate new wallet value
    setWallet(newWallet);
    console.log(newWallet);
    // setBalance(0);

    // try {
    //   const res = await axios.post('https://backend-bloodito-1.onrender.com/claim', {
    //     username: userId,
    //     tokens: newWallet // Use new wallet value
    //   });
    //   console.log(res.data);
    // } catch (err) {
    //   console.error("Error claiming tokens!", err);
    // }

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

          <div style={{fontSize: "20px", fontWeight: "bold"}}>
            Storage
          </div>
          <div>24 hr to fill</div>
          <div>0.02 LEAF/hour</div>

        </div>
        <button onClick={handleClaim} id='claim'>Mine</button>
      </div>
      <div>

      </div>

      <div className='btm'>
        <Link to='/social'>
        <div  className='btmm'>
          <img id='boost' src={mission}></img>
          <div >Missions</div>
        </div>
        </Link>
        <div className='btmm'>
          <img id='boost' src={boost}></img>
          <div>Boost</div>
        </div>
        <div className='btmm'>
          <img id='boost' src={refer}></img>
          <div>Refer</div>
        </div>
        <div className='btmm'>
          <img id='boost' src={walle}></img>
          <div>Wallet</div>
        </div>
        
      </div>


     
    </>
  );
};

export default App;