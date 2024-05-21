import React, { useState, useEffect } from 'react';
import logo from "./assets/logo.png";
import tree from './assets/tree.png';
import leaf from './assets/leaf.png';
import axios from 'axios'

const App = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [userId, setUserId] = useState(59700617);
  useEffect(() => {
    axios.post('https://backend-bloodito-1.onrender.com/user',{
      username:userId
    })
      .then(res => {
        console.log(res.data)
        setUser(res.data);
        // setIsLoaded(false); 
   // set loading to false after fetching the data
      })
      .catch(err => {
        // Handle the error here (for example, show a toast notification)
        // toast.error("Error fetching user data!"); 
        // setIsLoaded(false); 
    // even if there's an error, we should set loading to false
      });

  }, [user]);


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const userIdFromTelegram = initData.user && initData.user.id;
      if (userIdFromTelegram) {
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
      setBalance(currentBalance + elapsedSeconds *1);
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

  const handleClaim = async () => {
    setWallet(balance+wallet)
    console.log(wallet)
   
    setBalance(0)
    try{
      const res = await axios.post('https://backend-bloodito-1.onrender.com/claim',{
        username:userId,
        tokens:wallet
      });
      console.log(res.data);
      // setWallet(res.data[46].tokens);
    }
    catch(err){
      console.log(err)
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
          <div style={{fontSize: "20px", fontWeight: "bold"}}>
            Storage
          </div>
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




// import queryString from 'query-string';

// const App = () => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const currentUrl = window.location.href;
//     const parsedUrl = queryString.parseUrl(currentUrl);
//     const userId = parsedUrl.query.userId;

//     // Set the userId state
//     setUserId(userId);
//   }, []);

//   return (
//     <div>
//       {userId ? (
//         <p>User ID: {userId}</p>
//       ) : (
//         <p>User ID not found</p>
//       )}
//     </div>
//   );
// };

// export default App;