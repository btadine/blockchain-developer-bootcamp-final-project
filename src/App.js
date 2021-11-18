import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from './utils/CityHacks.json';

import { FormControl, FormSelect, Button, InputGroup } from 'react-bootstrap';
import Popup from 'reactjs-popup';
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
      {window.ethereum.networkVersion === `${NETWORKS[3]}` 
      ? `Post a hack (on ${NETWORKS[window.ethereum.networkVersion]})` 
      : `This only works on ${NETWORKS[3]}, please change your Network and refresh the page.`
      }
    </p>
  )

  const contractAddress = "0x1E6aba57aab452D40bb3b6D48Ee9DDB04c31bd62";
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
            address: hack.hacker,
            timestamp: new Date(hack.timestamp * 1000),
            description: hack.description,
            city: cities[hack.cityId.toNumber()],
            category: categories[hack.categoryId.toNumber()]
          });
        });

        setAllHacks(hacksCleaned);
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
        🏙️ Welcome to Cityhacks!
        </div>

        <div className="description">
          Share and discover cool things in your city (ie. cheap beers, a nice view spot, a hipster coffee place to work from...)
        </div>
        <div className="selectorsContainer">
        <FormSelect aria-label="Default select example" onChange={setCity}>
        {cities.map((city, index) => {
          return (
            <option value={index}>{city}</option>);
        })}
</FormSelect>
        <FormSelect aria-label="Default select example" onChange={setCategory}>
        {categories.map((category, index) => {
          return (
            <option value={index}>{category}</option>);
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
          {renderNetworkDetector()}
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
            </div>)
        })}
      </div>
    </div>
  );
}

export default App