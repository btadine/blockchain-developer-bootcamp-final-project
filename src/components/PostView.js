import React, { useState } from "react";
import './PostView.css';

import { FormControl, FormSelect, Button, InputGroup } from 'react-bootstrap';
import NetworkDetector from './NetworkDetector.js';

const PostView = (props) => {
    const [textValue, setTextValue] = useState("");
    const [cityId, setCityId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

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

  const handleClick = async (event) => {
    await props.postHack(textValue, cityId, categoryId);
    setTextValue("");
    props.getAllHacks();
  }

  return (
    <div>
                    {props.accountNotFound ? (
                      <div>
                            <div className="networkDetector">
      <NetworkDetector metamask={props.metamask} networkVersion={props.networkVersion}/>
      </div>
          <div className="connectWalletContainer">
          <button className="connectWalletButton" onClick={props.connectWallet}>
            Connect Wallet
          </button>
          </div>
          </div>
        ) :
(<div>
<div className="selectorsContainer">
        <FormSelect aria-label="Default select example" onChange={(e) => setCityId(e.target.value)}>
        {cities.map((city, index) => {
          return (
            <option key={'city'+index} value={index}>{city}</option>);
        })}
</FormSelect>
        <FormSelect aria-label="Default select example" onChange={(e) => setCategoryId(e.target.value)}>
        {categories.map((category, index) => {
          return (
            <option key={'category'+index} value={index}>{category}</option>);
        })}
</FormSelect>
</div>
    <InputGroup className="inputGroup">
    <FormControl
      className="formControl"
      placeholder="ie. cheap beers, a nice view spot, a hipster coffee place to work from..."
      aria-label="Your cityhack"
      aria-describedby="basic-addon2"
      onChange={(e) => setTextValue(e.target.value)}
      value={textValue}
    />
    <Button className="postButton" variant="outline-secondary" id="button-addon2" onClick={handleClick}>
      Post
    </Button>
        </InputGroup>
     </div>
  )}
      </div>
        );
}

export default PostView;