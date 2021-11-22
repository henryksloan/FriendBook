import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

import Draggable from 'react-draggable';

import './index.css';
import Popup from '../../Popup';
import Button from '../../Button';
import { getProfilePic } from '../../../utils/profile'

import dinosaur_image from '../../../assets/icons/dinosaur.png';
import suggestions from '../../../data/tone.json';

function Suggestion({ whichSuggestion, postText, onClickClose, onClickOkay }) {
  let location = useLocation();
  let tone = new URLSearchParams(location.search).get("condition");
  let suggestion = suggestions.find(obj => parseInt(obj.post_id) == whichSuggestion && obj.tone == tone);
  return (
    <Draggable>
      <Popup title="Suggestion" onClickClose={onClickClose}>
        <div className="suggestion-content">
          <img src={dinosaur_image} draggable="false" />
          <div className="suggestion-text">
            <p>{suggestion.text}</p>
            <div className="suggestion-preview">
              <div className="suggestion-user">
                <img className="post-profile-pic" src={getProfilePic("alex_doe")} />
                <p>Alex Doe</p>
              </div>
              <p>{postText}</p>
            </div>
            <div className="suggestion-buttons">
              <Button type="cancel" onClick={onClickClose}>No thanks</Button>
              <Button type="confirm" onClick={onClickOkay}>Okay</Button>
            </div>
          </div>
        </div>
      </Popup>
    </Draggable>
  );
}

Suggestion.propTypes = {
  whichSuggestion: PropTypes.number,
  postText: PropTypes.string,
  onClickClose: PropTypes.func.isRequired,
  onClickOkay: PropTypes.func.isRequired,
};

export default Suggestion;
