import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';
import Button from '../Button';
import MenuButton, { menuOptionShape } from './MenuButton';

export const menuLabelTypes = {
  // The open button is labeled with the current value
  CURRENT: "current",

  // Various icon options
  VERTICAl_DOTS: "vertical_dots",
  HORIZONTAL_DOTS: "horizontal_dots",
  GEAR: "gear",
}

function Menu({ title, labelType, openUpwards, options, seeMoreOptions, seeAllOptions, onClick, currentOption }) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAll, setShowAll] = useState(false);

  function optionsToButton(options) {
    return options.map((option, index) =>
      <MenuButton key={index} id={option.id} text={option.text} subtext={option.subtext}
        onClick={id => {
          onClick(id);
          setOpen(false);
        }} />);
  }

  let buttons = optionsToButton(options);

  if (seeMoreOptions) {
    if (showMore) {
      buttons.concat(optionsToButton(seeMoreOptions))
    } else {
      buttons.push(<MenuButton id="more" text="▼ More" onClick={() => setShowMore(true)} />)
    }
  }

  if (seeAllOptions) {
    if (showAll) {
      buttons.concat(optionsToButton(seeAllOptions))
    } else {
      buttons.push(<MenuButton id="all" text="▼ See All" onClick={() => setShowAll(true)} />)
    }
  }

  // TODO: Highlighting, etc.
  const openButton = (labelType == menuLabelTypes.CURRENT)
    ? <Button type="cancel" onClick={() => setOpen(true)} className="menu-current-button">
      {currentOption() + " ▼"}
    </Button>
    : <Button onClick={this.showMenu} >
      <span className={"menu-icon" + ' ' + (labelType || menuLabelTypes.VERTICAl_DOTS)}></span>
    </Button>;

  const menuList = open && <div className="menu-list">
    {title && <p>{title}</p>}
    {buttons}
  </div>;

  return (
    <div className="Menu">
      {openUpwards && menuList}
      {openButton}
      {!openUpwards && menuList}
    </div>
  );
}

Menu.propTypes = {
  title: PropTypes.string,
  labelType: PropTypes.string, // One of menuLabelTypes
  openUpwards: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.exact(menuOptionShape)).isRequired,
  seeMoreOptions: PropTypes.arrayOf(PropTypes.exact(menuOptionShape)),
  seeAllOptions: PropTypes.arrayOf(PropTypes.exact(menuOptionShape)),
  onClick: PropTypes.func,
  currentOption: PropTypes.func,
};

export default Menu;
