import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function MenuButton({ id, text, subtext, icon, onClick }) {
  // TODO: Button types like disabled, cancel, etc.
  return (
    <Button className="MenuButton" onClick={() => onClick && onClick(id)} >
      <img src={icon} />
      {text}
      {subtext && <p id="menu-button-subtext">{subtext}</p>}
    </Button>
  );
}

export const menuOptionShape = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  subtext: PropTypes.string,
  onClick: PropTypes.func,
};

MenuButton.propTypes = menuOptionShape;

export default MenuButton;
