import React from 'react';
import PropTypes from 'prop-types';

function Button({ children }) {
  return (
    <a className="Button">
      {children}
    </a>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired
};

export default Button;
