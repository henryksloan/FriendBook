import React from 'react';
import PropTypes from 'prop-types';

import { getFullName, getProfilePic } from '../../../utils/profile'
import { audienceText, audienceListItemText, audienceIcon } from '../../../utils/audience'
import selected_icon from '../../../assets/icons/audience/selected.png';
import unselected_icon from '../../../assets/icons/audience/unselected.png';
import more_icon from '../../../assets/icons/audience/arrow.png';

function AudienceOption({ audience, selected, moreButton, friend, onClick }) {
  let audience_list_item = audienceListItemText(audience);
  let explanation = audience_list_item ? audience_list_item[1] : "";
  let icon = moreButton ? more_icon : (selected ? selected_icon : unselected_icon);

  let isFriendButton = (audience == "friend_button");
  let optionIcon = isFriendButton
    ? <img className="audience-profile-pic" src={getProfilePic(friend)} />
    : <img className="audience-option-icon" src={audienceIcon(audience)} />;

  return (
    <div className={"AudienceOption" + (selected ? " selected" : "")} onClick={onClick}>
      <div className="audience-option-icon-container">
        <div className="audience-option-icon-circle">
          {optionIcon}
        </div>
      </div>

      {isFriendButton
        ? <div className="audience-friend-text">
          <p>{getFullName(friend)}</p>
        </div>
        : <div className="audience-option-text">
          <h3>{audienceText(audience)}</h3>
          <p>{explanation}</p>
        </div>
      }

      <img src={icon} className="audience-option-select" />
    </div>
  );
}

AudienceOption.propTypes = {
  audience: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  moreButton: PropTypes.bool,
  friend: PropTypes.string,
  onClick: PropTypes.func,
};

export default AudienceOption;
