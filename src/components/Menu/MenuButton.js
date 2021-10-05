import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function MenuButton({ id, text, subtext, onClick }) {
  // TODO: Button types like disabled, cancel, etc.
  return (
    <Button className="MenuButton" onClick={() => onClick && onClick(id)} >
      {text}
      {subtext && <p id="menu-button-subtext">{subtext}</p>}
    </Button>
  );
}

export const menuOptionShape = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  onClick: PropTypes.func,
};

MenuButton.propTypes = menuOptionShape;

export default MenuButton;
