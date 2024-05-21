import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import logo from "./assets/logo.png"
import tree from './assets/tree.png'
import leaf from './assets/leaf.png'
const App= () => {
  const [balance, setBalance] = useState(0);
const [userId, setUserId] = useState(null);

  // Set the userId state
  // setUserId(userId);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdFromUrl = params.get('userId');
    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
    }
  }, []);


console.log(userId)

  useEffect(() => {
    // Get the last update time from localStorage
    const lastUpdate = localStorage.getItem('lastUpdate');
    const currentBalance = parseInt(localStorage.getItem('balance'), 10) || 0;
    const currentTime = Date.now();

    if (lastUpdate) {
      const elapsedSeconds = Math.floor((currentTime - parseInt(lastUpdate, 10)) / 1000);
      setBalance(currentBalance + elapsedSeconds*0.0002);
    } else {
      setBalance(currentBalance);
    }

    // Update the balance every second
    const interval = setInterval(() => {
      setBalance(prevBalance => {
        const newBalance = prevBalance + 0.0002;
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
      <div className='balance'>{balance.toFixed(4)}</div>
    </div>
    <div className='tree' >
    <img src={tree}>
    </img>
    </div>


    <div className='bag'>
      <img src={leaf}></img>
      <div>
        <div style={{fontSize:"20px",fontWeight:"bold"}}>
          Storage
        </div>
        <div>1 hr to fill</div>
        <div>0.02 SEED/hour</div>
      </div>
      <div id='claim'> Claim </div>

    </div>
    <p>User ID: {userId}</p>
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

