import React, { useEffect, useState } from "react";
import Poll from './Poll.js';
import { Button } from 'react-bootstrap';
import './BrowseView.css';


const BrowseView = (props) => {
  const [hackIdsVoted, setHackIdsVoted] = useState([]);
  const [hackIdsVotes, setHackIdsVotes] = useState([]);
  const handleVote = async (vote, hackId) => {
    await props.voteHack(hackId, vote);
    await props.getAllHacks();
    props.fetchEvents();
  }

  useEffect(() => {
    setHackIdsVoted(props.votedHacks.map ((votedHack) => votedHack.hackId))
    setHackIdsVotes(props.votedHacks.map ((votedHack) => votedHack.vote))
  }, [props])

  
  
  return (
    <div>
      <div className="cityhacks">
        {props.hacks.map((hack, index) => {
          return (
            <div className="cityHack" key={index} style={{ backgroundColor: "#282828", marginTop: "16px", padding: "8px", borderRadius: 10 + 'px' }}>
              <div className="cityhackfield">Address: {hack.address}</div>
              <div className="cityhackfield">Time: {hack.timestamp.toString()}</div>
              <div className="cityhackfield">Description: {hack.description}</div>
              <div className="cityhackfield">City: {hack.city}</div>
              <div className="cityhackfield">Category: {hack.category}</div>
              <div className="actionsContainer">
                  <Button className="postButton" variant="outline-secondary" id="button-addon2" onClick={()=> props.handleTip(hack.id)}>
                  Tip
                  </Button>
                <div className="poll">
                <Poll hackId={hack.id} onVote={handleVote} upVotes={hack.upvotes} downVotes={hack.downvotes} hackIdsVotes={hackIdsVotes} hackIdsVoted={hackIdsVoted}/>
                </div>
              </div>
            </div>)
        })}
      </div>
      </div>
        );
}

export default BrowseView;