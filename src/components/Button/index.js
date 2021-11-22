import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

function Button({ children, className, id, type, isDisabled, href, routeTo, onClick }) {
  const disabled = (isDisabled && isDisabled()) ? " disabled" : "";
  const classNames = "Button " + (type || "default ") + disabled + " " + className;
  // TODO: Highlighting
  // TODO: Style prop?
  if (routeTo) {
    return (
      <Link className={classNames} id={id} onClick={isDisabled ? () => { } : onClick} to={routeTo}>
        {children}
      </Link>
    )
  } else {
    return (
      <a className={classNames} id={id} href={href} onClick={isDisabled ? () => { } : onClick}>
        {children}
      </ a >
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.func,
  href: PropTypes.string,
  routeTo: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
