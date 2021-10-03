import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './index.css';
import Button from '../Button';
import SettingsDropdown from './SettingsDropdown';
import NotificationsDropdown from './NotificationsDropdown';

import alex_profile_img from '../../assets/users/alex_profile_img.jpg';
import find_friends from '../../assets/icons/find_friends.png';
import messages from '../../assets/icons/messages.png';
import notifications_unread from '../../assets/icons/notifications_unread.png';
import notifications_black from '../../assets/icons/notifications_black.png';
import quick_help from '../../assets/icons/quick_help.png';
import settings_highlight from '../../assets/icons/settings_highlight.png';
import settings_black from '../../assets/icons/settings_black.png';

function Header() {
  /* eslint-disable no-unused-vars */
  const [showNotificationIcon, setShowNotificationIcon] = useState(true);
  const [renderSettings, setRenderSettings] = useState(false);
  const [renderNotifications, setRenderNotifications] = useState(false);
  /* eslint-enable no-unused-vars */

  function onClickNotifications() {
    setRenderNotifications(!renderNotifications);
    setShowNotificationIcon(false);
    setRenderSettings(false);

    // registerEvent("Clicked on the Notification button", 'to open the notifications drop down ', 'Header');
  }

  function onClickSettings() {
    setRenderSettings(!renderNotifications);
    setRenderNotifications(false);

    // registerEvent("Clicked on the privacy settings dropdown button", 'to open the settings drop down', ' Header');
  }

  /* eslint-disable no-unused-vars */
  function registerClick(action, details, point_of_action) {
    // registerEvent(action, details, ' From ' + point_of_action);
  }
  /* eslint-enable no-unused-vars */

  // TODO: Decide whether to highlight
  const highlight = false;

  return (
    <header className="Header">
      <Link to={{
        pathname: '/',
        state: { fromHeader: true }
      }} onClick={() => registerClick('Clicked on the FriendBook Button', 'to go to the NewsFeed', 'Header')}><h1 id="logo">FriendBook</h1>
      </Link>

      <div id='user'>
        <Link to={{
          pathname: '/profile/alex_doe',
          state: { fromNewsFeed: true }
        }} onClick={() => registerClick("Clicked on Alex Doe's", "profile link to visit their profile page", 'Header')}><img id='profile-pic' src={alex_profile_img} /><span id='header-text'>  Alex</span></Link>

        <div id='header-text'>
          <Link to={{
            pathname: '/',
            state: { fromNewsFeed: true }
          }} onClick={() => registerClick('Clicked on the Home Button', 'to go to the NewsFeed', 'Header')}><span>Home</span></Link>

          <span data-tip="Not Implemented">Create</span>

          <span data-tip="Not Implemented">
            <img id='profile-pic' src={find_friends} />
          </span>

          <span data-tip="Not Implemented">
            <img id='profile-pic' src={messages} />
          </span>

          <span>
            <Button onClick={onClickNotifications}>
              <img id='profile-pic' src={showNotificationIcon ? notifications_unread : notifications_black} />
            </Button>
          </span>

          <span data-tip="Not Implemented">
            <img id='profile-pic' src={quick_help} />
          </span>

          <span>
            <Button onClick={onClickSettings}>
              {highlight
                ? <img id='profile-pic' src={settings_highlight} />
                : <img id='profile-pic' src={settings_black} />
              }
            </Button>
          </span>

          {renderSettings &&
            <SettingsDropdown onClick={onClickSettings} destroy={() => setRenderSettings(false)} />}

          {renderNotifications &&
            <NotificationsDropdown onClick={onClickNotifications} destroy={() => setRenderNotifications(false)} />}
        </div>
      </div>

    </header>
  );
}

export default Header;
