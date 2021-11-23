import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from './utils/CityHacks.json';

import { FormControl, FormSelect, Button, InputGroup } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import Poll from './components/Poll.js';
import 'reactjs-popup/dist/index.css';
import './App.css';

const App = () => {
    const [allHacks, setAllHacks] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");
    const [textValue, setTextValue] = useState("");
    const [cityId, setCityId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [errorOcurred, setErrorOcurred] = useState(false);

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

  const NETWORKS = {
  1: "Ethereum Mainnet",
  2: "Kovan Testnet",
  3: "Ropsten Testnet",
  4: "Rinkeby Testnet",
  5: "Goerli Testnet",
}
const renderNetworkDetector = () => (
    <p className="footer-text">
      {window.ethereum ? window.ethereum.networkVersion === `${NETWORKS[3]}` 
      ? `Post a hack (on ${NETWORKS[window.ethereum.networkVersion]})` 
      : `This only works on ${NETWORKS[3]}, please change your Network and refresh the page.`
      : `You need metamask to post a hack.`
      }
    </p>
  )

  const contractAddress = "0x776b790ac3108ED770f466c9976583a483Cd3572";
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
      const { ethereum } = window;
      if (ethereum) {
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
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

const postHack = async (text) => {
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
        const hackIdBigNumber = ethers.BigNumber.from(hackId);
        console.log(hackId, vote, hackIdBigNumber);
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

  const handleChange = (event) => {
    setTextValue(event.target.value);
  }

  const handleClick = async (event) => {
    await postHack(textValue);
    setTextValue("");
    getAllHacks();
  }

  const setCity = (event) => {
    setCityId(event.target.value);
  }

  const setCategory = (event) => {
    setCategoryId(event.target.value);
  }

  const resetError = () => {
    setErrorOcurred(false);
  }

  const handleVote = async (vote, hackId) => {
    console.log(hackId);
    await voteHack(hackId, vote);
    getAllHacks();
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
    getAllHacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className="mainContainer">
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
        <span role="img" aria-label="City emoji">🏙️</span> Welcome to Cityhacks!
        </div>

        <div className="description">
          Share and discover cool things in your city (ie. cheap beers, a nice view spot, a hipster coffee place to work from...)
        </div>
        <div className="selectorsContainer">
        <FormSelect aria-label="Default select example" onChange={setCity}>
        {cities.map((city, index) => {
          return (
            <option key={'city'+index} value={index}>{city}</option>);
        })}
</FormSelect>
        <FormSelect aria-label="Default select example" onChange={setCategory}>
        {categories.map((category, index) => {
          return (
            <option key={'category'+index} value={index}>{category}</option>);
        })}
</FormSelect>
</div>
          <InputGroup className="inputGroup">
    <FormControl
      className="formControl"
      placeholder="Your cityhack"
      aria-label="Your cityhack"
      aria-describedby="basic-addon2"
      onChange={handleChange}
      value={textValue}
    />
    <Button className="postButton" variant="outline-secondary" id="button-addon2" onClick={handleClick}>
      Post
    </Button>
        </InputGroup>
        <div className="networkDetector">
          {renderNetworkDetector()}
        </div>
        {!currentAccount && (
          <button className="postHack" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {allHacks.map((hack, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {hack.address}</div>
              <div>Time: {hack.timestamp.toString()}</div>
              <div>Description: {hack.description}</div>
              <div>City: {hack.city}</div>
              <div>Category: {hack.category}</div>
              <Poll hackId={hack.id} onVote={handleVote} upVotes={hack.upvotes} downVotes={hack.downvotes}/>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App