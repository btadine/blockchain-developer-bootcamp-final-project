import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from './utils/CityHacks.json';

import { FormControl, Button, InputGroup } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import TabComponent from './components/Tabs.js';
import PostView from './components/PostView.js';
import BrowseView from './components/BrowseView.js';

import 'reactjs-popup/dist/index.css';
import './App.css';

const App = () => {
    const [allHacks, setAllHacks] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const [errorOcurred, setErrorOcurred] = useState(false);
    const [tipHackPressed, setTipHackPressed] = useState(false);
    const [tipValue, setTipValue] = useState("");
    const [hackId, setHackId] = useState(0);

  const alchemyKey = "WQdePxSH5rFBaHe6TVIrlm6Xts-YZtT3";
  const cities = [
  "Choose a city",
  "Barcelona",
  "Buenos Aires",
  "Lisboa",
  "Madrid",
  "London",
  "Tokyo",
  "New York",
  "San Francisco",
  "Berlin",
  "Paris",
  "Rome",
  "Athens"];

  const categories = [
  "Choose a category",
  "Cheap",
  "Nice Spot",
  "Traditional",
  "Parking",
  "Coworking",
  "Misc"
  ];

  const contractAddress = "0xB7b5b872948Ee07E6b7e43A935E600Cd79E8799E";
  const contractABI = abi.abi;
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        /*We have the ethereum object"*/
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        /*Found an authorized account*/
        setCurrentAccount(account);
      } else {
        /*No authorized account found. Show error*/
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /* Wallet Connected*/
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  const getAllHacks = async () => {
    try {
        const provider = new ethers.providers.AlchemyProvider("ropsten", alchemyKey);   
        const cityHacksContract = new ethers.Contract(contractAddress, contractABI, provider);


        const hacks = await cityHacksContract.getAllHacks();

        let hacksCleaned = [];
        hacks.forEach(hack => {
          hacksCleaned.push({
            id: hack.id.toNumber(),
            address: hack.owner,
            timestamp: new Date(hack.timestamp * 1000),
            description: hack.description,
            city: cities[hack.cityId.toNumber()],
            category: categories[hack.categoryId.toNumber()],
            upvotes: hack.totalUpvotes.toNumber(),
            downvotes: hack.totalDownvotes.toNumber()
          });
        });

        setAllHacks(hacksCleaned.sort((a, b) => b.upvotes - a.upvotes));
    } catch (error) {
      console.log(error);
    }
  }

const postHack = async (text, cityId, categoryId) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cityHacksContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const hackTxn = await cityHacksContract.postHack(text, cityId, categoryId);
        // Mining, insert an animation to inform user.

        await hackTxn.wait();
        // Txn mined
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setErrorOcurred(true);
      console.log(error);
    }
  }

  const voteHack = async (hackId, vote) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cityHacksContract = new ethers.Contract(contractAddress, contractABI, signer);
        const hackTxn = await cityHacksContract.voteHack(hackId, vote);
        // Mining, insert an animation to inform user.

        await hackTxn.wait();
        // Txn mined
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setErrorOcurred(true);
      console.log(error);
    }
  }

    const tipHacker = async () => {
      setTipHackPressed(false);
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cityHacksContract = new ethers.Contract(contractAddress, contractABI, signer);
        let overrides = { value: ethers.utils.parseEther(tipValue)};

// Pass in the overrides as the 3rd parameter to your 2-parameter function:
//let tx = await exchangeContract.ethToTokenSwapOutput(tokens_bought, deadline, overrides);
        const hackTxn = await cityHacksContract.tipHacker(hackId, overrides);
        // Mining, insert an animation to inform user.

        await hackTxn.wait();
        // Txn mined
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setErrorOcurred(true);
      console.log("tipHacker")
      console.log(error);
    }
  }

  const resetError = () => {
    setErrorOcurred(false);
  }

const handleTip = (hackId) => {
    setHackId(hackId);
    setTipHackPressed(true);
}
  
  const setTip = (event) => {
    setTipValue(event.target.value);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    getAllHacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // (ie. cheap beers, a nice view spot, a hipster coffee place to work from...) Share and discover cool things in your city!
  return (
    <div className="mainContainer">
      <Popup open={tipHackPressed}
       onClose={() => setTipHackPressed(false)}
       position="right center">
       {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Tip cityhacker </div>
        <div className="content">
          {' '}
          Add the tip amount.
        </div>
                  <InputGroup className="inputGroup">
    <FormControl
      className="formControl"
      placeholder="Amount in ethers"
      aria-label="Tip amount"
      aria-describedby="basic-addon2"
      onChange={setTip}
      value={tipValue}
    />
        <Button className="postButton" variant="outline-secondary" id="button-addon2" onClick={tipHacker}>
      Tip
    </Button>
        </InputGroup>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Popup>
      <Popup open={errorOcurred}
       onClose={resetError}
       position="right center">
       {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Whoops! An error has ocurred </div>
        <div className="content">
          {' '}
          The smart contract rejected the operation. Have you selected a city, a category and filled the description?
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Okay
          </button>
        </div>
      </div>
    )}
  </Popup>
      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="City emoji">🏙️</span> Cityhacks
        </div>

        <div className="description">
<b>A decentralized city guide.</b><br></br><br></br>Have you ever wondered where locals eat, where they park, get the cheapest beers and the best coffee?<br></br><br></br>Go ahead and discover <b>the cool stuff</b>!
        </div>
        <div className="tabsContainer">
        <TabComponent postView={() => <PostView metamask={window.ethereum !== undefined} 
        networkVersion={window.ethereum.networkVersion} postHack={postHack} getAllHacks={getAllHacks} connectWallet={connectWallet} accountNotFound={!currentAccount} />} browseView={() => <BrowseView hacks={allHacks} getAllHacks={getAllHacks} voteHack={voteHack} handleTip={handleTip}/>}>
        </TabComponent>
        </div>
      </div>
    </div>
  );
}

export default App