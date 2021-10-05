import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

function Button({ children, id, type, isDisabled, href, routeTo, onClick }) {
  const disabled = (isDisabled && isDisabled()) ? " disabled" : "";
  const className = "Button " + (type || "default ") + disabled;
  // TODO: Highlighting
  // TODO: Style prop?
  if (routeTo) {
    return (
      <Link className={className} id={id} onClick={onClick} to={routeTo}>
        {children}
      </Link>
    )
  } else {
    return (
      <a className={className} id={id} href={href} onClick={onClick}>
        {children}
      </ a >
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.func,
  href: PropTypes.string,
  routeTo: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
