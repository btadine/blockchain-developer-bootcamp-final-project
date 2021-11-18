import React, { useEffect, useState } from "react";
import './Poll.css';

const Poll = (props) => {
    return (
      <div className="poll-container">
        <div>
          <button type="button" id="good" onClick={() => props.onVote(true)}><span>&#128077; </span><span> {props.upVotes}</span></button>
          <button type="button" id="bad" onClick={() => props.onVote(false)}><span>&#128078; </span><span> {props.downVotes}</span></button>
        </div>
      </div>
    )
  }

export default Poll;