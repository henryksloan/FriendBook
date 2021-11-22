import React from 'react';
import PropTypes from 'prop-types';

import Draggable from 'react-draggable';

import './index.css';
import Popup from '../../Popup';

import dinosaur_image from '../../../assets/icons/dinosaur.png';

function Suggestion({ onClickClose }) {
  return (
    <Draggable>
      <Popup title="Suggestion" onClickClose={onClickClose}>
        <div className="suggestion-content">
          <img src={dinosaur_image} />
        </div>
      </Popup>
    </Draggable>
  );
}

Suggestion.propTypes = {
  onClickClose: PropTypes.func.isRequired,
};

export default Suggestion;
