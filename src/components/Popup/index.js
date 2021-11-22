import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Popup({ children, title, onClickClose, className, ...others }) {
  return (
    <div className={"Popup " + className} {...others}>
      <div className="popup-container">
        <div className="popup-header">
          <h2>{title}</h2>
          <span className="popup-close-button" onClick={() => { onClickClose && onClickClose() }}>✕</span>
        </div>

        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClickClose: PropTypes.func,
  className: PropTypes.string,
};

export default Popup;
