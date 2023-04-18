import {useState, useEffect} from 'react';
import {ethers} from 'ethers'
import Abi from './contract/Coffee.json' 
import Buy from './components/Buy';
import Memos from './components/Memos';
import './App.css';
import coffeeBanner from './coffeeBanner.jpg'

function App() {
  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null,
  })
  const [account, setAccount] = useState("None");
  useEffect(()=>{
    const connectWallet = async()=>{
      const contractAddress = "0x8798a5F2eC0EFC6603dDac5d1347a346E15F5348";
      const contractABI = Abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum){
          const account = await ethereum.request({
            method:"eth_requestAccounts",
          })
          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          })
          window.ethereum.on("accountChanged",()=>{
            window.location.reload();
          })
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          )
          setAccount(account);
          setState({provider,signer,contract});
        }
        else{
          alert("Please Install Metamask");
        }
      }
      catch(error){
        console.log(error)
      }
    }
    connectWallet();
  },[])
  console.log(state)
  return (
    <div className="App"  style={{ backgroundColor: "#EFEFEF", height: "100%" }}> 
      <img src={coffeeBanner} className="img-fluid" alt=".." width="100%" />

      <p class="text-muted lead "style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <div className='container'>
        <Buy state={state}/>
        <Memos state={state}/>
      </div>
    </div>
  );
}

export default App;
