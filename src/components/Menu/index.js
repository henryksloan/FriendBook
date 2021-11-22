import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import useOutsideClickDetector from '../../hooks/outside_click_detector';

import './index.css';
import Button from '../Button';
import MenuButton, { menuOptionShape } from './MenuButton';

export const menuLabelTypes = {
  // The open button is labeled with the current value
  CURRENT: "current",

  // Various icon options
  VERTICAl_DOTS: "vertical-dots",
  HORIZONTAL_DOTS: "horizontal-dots",
  GEAR: "gear",
}

function Menu({ title, labelType, openUpwards, options, icons, seeMoreOptions, seeAllOptions, currentOption, width }) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const menuRef = useRef(null);
  useOutsideClickDetector(menuRef, () => setOpen(false));

  function optionsToButton(options) {
    return options.map((option, index) =>
      <MenuButton key={index} id={option.id} text={option.text} subtext={option.subtext}
        icon={icons && icons[index]}
        onClick={id => {
          if (option.onClick) {
            option.onClick(id);
          }
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
    : <Button onClick={() => setOpen(true)} >
      <span className={"menu-icon" + ' ' + (labelType || menuLabelTypes.VERTICAl_DOTS)}></span>
    </Button>;

  const menuList = open && <div className="menu-list" style={{ width }}>
    {title && <p className="menu-list-title">{title}</p>}
    {buttons}
  </div>;

  return (
    <div className="Menu" ref={menuRef}>
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
  icons: PropTypes.arrayOf(PropTypes.string),
  seeMoreOptions: PropTypes.arrayOf(PropTypes.exact(menuOptionShape)),
  seeAllOptions: PropTypes.arrayOf(PropTypes.exact(menuOptionShape)),
  currentOption: PropTypes.func,
  width: PropTypes.string,
};

export default Menu;
