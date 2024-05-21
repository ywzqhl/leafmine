// import logo from './logo.svg';
// import './App.css';
import logo from '../assets/logo.png';
import telegram from '../assets/telegram.png'
import x from '../assets/x.png'
function Social() {
  return (
    <>
    <center>
    <img style={{width:"200px"}} src={logo}></img>
    <div style={{fontSize:"30px",fontWeight:"bold",fontFamily:"sans-serif",marginBottom:'20px'}}>2 missions Available</div>
    <div style={{fontSize:"20px",fontWeight:"bold",fontFamily:"sans-serif",marginBottom:'20px',marginBottom:"40px"}}>Join Socials Now</div>
    </center>
    
    <div className='social'>
        <div>
          <img src={telegram}></img>
          Join telegram Now
          <a href="https://t.me/leafmine">
          <button>Join</button>
          </a>
        </div>
        <div>
          <img src={x}></img>
          Join Twitter Now
          <a href="https://x.com/LeafMine_ton?t=IZSR30vkXecKNKUid5y1Ow&s=09">
          <button>Join</button>
          </a>
        </div>
    </div>
    </>
  );
}

export default Social;