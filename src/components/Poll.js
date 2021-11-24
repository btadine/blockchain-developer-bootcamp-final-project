import React from "react";
import './Poll.css';

const Poll = (props) => {
    return (
      <div className="poll-container">
        <div>
          <button type="button" id="good" onClick={() => props.onVote(true, props.hackId)}><span role="img" aria-label="Thumbs up">&#128077; </span><span> {props.upVotes}</span></button>
          <button type="button" id="bad" onClick={() => props.onVote(false, props.hackId)}><span role="img" aria-label="Thumbs down">&#128078; </span><span> {props.downVotes}</span></button>
        </div>
      </div>
    )
  }

export default Poll;