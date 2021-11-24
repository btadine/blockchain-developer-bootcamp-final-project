import React, {useEffect} from "react";
import './Poll.css';

const Poll = (props) => {
    return (
      <div className="poll-container">
        <div>
        { props.hackIdsVotes[props.hackIdsVoted.indexOf(props.hackId)] ?
         <button className="buttonSelected" type="button" id="good" onClick={() => props.onVote(true, props.hackId)}><span role="img" aria-label="Thumbs up">&#128077; </span><span> {props.upVotes}</span></button>
         :
         <button type="button" id="good" onClick={() => props.onVote(true, props.hackId)}><span role="img" aria-label="Thumbs up">&#128077; </span><span> {props.upVotes}</span></button>
        }
        { props.hackIdsVotes[props.hackIdsVoted.indexOf(props.hackId)] === false ?
                   <button className="buttonSelected" type="button" id="bad" onClick={() => props.onVote(false, props.hackId)}><span role="img" aria-label="Thumbs down">&#128078; </span><span> {props.downVotes}</span></button>
         :
                   <button type="button" id="bad" onClick={() => props.onVote(false, props.hackId)}><span role="img" aria-label="Thumbs down">&#128078; </span><span> {props.downVotes}</span></button>
        }
        </div>
      </div>
    )
  }

export default Poll;