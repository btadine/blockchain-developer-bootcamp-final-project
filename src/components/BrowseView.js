import React from "react";
import Poll from './Poll.js';
import { Button } from 'react-bootstrap';

const BrowseView = (props) => {

  const handleVote = async (vote, hackId) => {
    await props.voteHack(hackId, vote);
    props.getAllHacks();
  }
  return (
    <div>
      <div className="cityhacks">
        {props.hacks.map((hack, index) => {
          return (
            <div className="cityHack" key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div className="cityhackfield">Address: {hack.address}</div>
              <div className="cityhackfield">Time: {hack.timestamp.toString()}</div>
              <div>Description: {hack.description}</div>
              <div>City: {hack.city}</div>
              <div>Category: {hack.category}</div>
              <div className="actionsContainer">
                  <Button className="postButton" variant="outline-secondary" id="button-addon2" onClick={()=> props.handleTip(hack.id)}>
                  Tip
                  </Button>
                <div className="poll">
                <Poll hackId={hack.id} onVote={handleVote} upVotes={hack.upvotes} downVotes={hack.downvotes}/>
                </div>
              </div>
            </div>)
        })}
      </div>
      </div>
        );
}

export default BrowseView;