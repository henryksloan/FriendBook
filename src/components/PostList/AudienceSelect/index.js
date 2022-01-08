import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';
import AudienceOption from './AudienceOption';
import Button from '../../Button';
import { friendList } from '../../../utils/profile'

function AudienceSelect({ onSelect, audience, friends_except_list, specific_friends_list }) {
  // If null, show option buttons,
  // else show some friend selection list (like "friends_except")
  const [whichFriendMenu, setWhichFriendMenu] = useState(null);
  const [friendsExcept, setFriendsExcept] = useState(friends_except_list ? friends_except_list : []);
  const [specificFriends, setSpecificFriends] = useState(specific_friends_list ? specific_friends_list : []);

  const options = [["public", false], ["friends", false], ["friends_except", true], ["specific_friends", true], ["only_me", false], ["custom", false]];

  function friendSelected(friend) {
    switch (whichFriendMenu) {
      case "friends_except":
        return friendsExcept.includes(friend);
      case "specific_friends":
        return specificFriends.includes(friend);
      default:
        return false;
    }
  }

  function selectedFriendList() {
    switch (whichFriendMenu) {
      case "friends_except":
        return friendsExcept;
      case "specific_friends":
        return specificFriends;
      default:
        return [];
    }
  }

  function toggleFriendSelected(friend) {
    switch (whichFriendMenu) {
      case "friends_except": {
        let copy = [...friendsExcept];
        let index = copy.indexOf(friend);
        if (index !== -1) {
          copy.splice(index, 1);
        } else {
          copy.push(friend);
        }
        setFriendsExcept(copy);
        break;
      }
      case "specific_friends": {
        let copy = [...specificFriends];
        let index = copy.indexOf(friend);
        if (index !== -1) {
          copy.splice(index, 1);
        } else {
          copy.push(friend);
        }
        setSpecificFriends(copy);
        break;
      }
    }
  }

  function select(audience, more) {
    return more
      ? () => { setWhichFriendMenu(audience) }
      : () => { onSelect(audience); };
  }

  function makeOption(audienceOption, moreButton = false) {
    return <AudienceOption
      key={audienceOption}
      audience={audienceOption}
      moreButton={moreButton}
      selected={audience == audienceOption}
      onClick={select(audienceOption, moreButton)} />;
  }

  function friendButton(friend) {
    return <AudienceOption
      key={friend}
      audience="friend_button"
      friend={friend}
      selected={friendSelected(friend)}
      onClick={() => toggleFriendSelected(friend)}
    />;
  }

  function makeFriendButtons() {
    return friendList.map(friend => friendButton(friend));
  }

  function cancelSelectFriends() {
    setWhichFriendMenu(null);
    setFriendsExcept(friends_except_list ? friends_except_list : []);
    setSpecificFriends(specific_friends_list ? specific_friends_list : []);
  }

  function saveSelectFriends() {
    onSelect(whichFriendMenu, selectedFriendList());
  }

  return (
    <div className="AudienceSelect">
      {whichFriendMenu
        ? <div className="audience-friend-menu">
          <div className="audience-friend-buttons">{makeFriendButtons()}</div>
          <div className="audience-friend-bottom-buttons">
            <Button type="cancel" onClick={cancelSelectFriends}>Cancel</Button>
            <Button type="confirm" onClick={saveSelectFriends}>Save changes</Button>
          </div>
        </div>
        : <div className="audience-options">{options.map(option => makeOption(option[0], option[1]))}</div>}
    </div>
  );
}

AudienceSelect.propTypes = {
  onSelect: PropTypes.func,
  audience: PropTypes.string,
  friends_except_list: PropTypes.arrayOf(PropTypes.string),
  specific_friends_list: PropTypes.arrayOf(PropTypes.string),
};

export default AudienceSelect;
