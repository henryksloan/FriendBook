import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Menu, { menuLabelTypes } from '../Menu';
import { audienceText, audienceListItemText } from '../../utils/audience'

function AudienceMenu({ title, options }) {
  const [currentAudience, setCurrentAudience] = useState("public");

  /* eslint-disable no-unused-vars */
  const [renderFriendsExceptPopup, setRenderFriendsExceptPopup] = useState(false);
  const [renderSpecificFriendsPopup, setRenderSpecificFriendsPopup] = useState(false);
  const [renderCustomFriendsPopup, setRenderCustomFriendsPopup] = useState(false);
  /* eslint-enable no-unused-vars */

  // TODO: Highlighting
  const menuOptions = options.map(id => {
    let [text, subtext] = audienceListItemText(id);
    let onClick = () => { };
    switch (id) {
      case "friends_except":
        onClick = () => setRenderFriendsExceptPopup(true);
        break;
      case "specific_friends":
        onClick = () => setRenderSpecificFriendsPopup(true);
        break;
      case "custom":
        onClick = () => setRenderCustomFriendsPopup(true);
        break;
      default:
        onClick = () => setCurrentAudience(id);
        break;
    }
    return {
      id,
      text,
      subtext,
      onClick,
    }
  });

  // TODO: Popups, track features visited, highlighting, etc.
  return (
    <span className="AudienceMenu">
      {/* renderFriendsExceptPopup && friendsExceptPopup */}
      {/* renderSpecificFriendsPopup && specificFriendsPopup */}
      {/* renderCustomFriendsPopup && customFriendsPopup */}
      <Menu title={title} labelType={menuLabelTypes.CURRENT} options={menuOptions} currentOption={() => audienceText(currentAudience)} />
    </span>
  );
}

AudienceMenu.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AudienceMenu;
