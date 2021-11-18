import React, { useEffect, useState } from "react";
import './Poll.css';

const Poll = () => {
const [counterUp, setCounterUp] = useState(0);
const [counterDown, setCounterDown] = useState(0);

const handleClick = (positive) => {
  positive ? setCounterUp(counterUp + 1) : setCounterDown(counterDown + 1)
}
    return (
      <div className="poll-container">
        <div>
          <button type="button" id="good" onClick={() => handleClick(true)}><span>&#128077; </span><span> {counterUp}</span></button>
          <button type="button" id="bad" onClick={() => handleClick(false)}><span>&#128078; </span><span> {counterDown}</span></button>
        </div>
      </div>
    )
  }

export default Poll;