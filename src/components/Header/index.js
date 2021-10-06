import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { getProfilePic } from '../../utils/profile';

import './index.css';
import Button from '../Button';
import SettingsDropdown from './SettingsDropdown';
import NotificationsDropdown from './NotificationsDropdown';

import find_friends from '../../assets/icons/find_friends.png';
import messages from '../../assets/icons/messages.png';
import notifications_unread from '../../assets/icons/notifications_unread.png';
import notifications_black from '../../assets/icons/notifications_black.png';
import quick_help from '../../assets/icons/quick_help.png';
import settings_highlight from '../../assets/icons/settings_highlight.png';
import settings_black from '../../assets/icons/settings_black.png';

function Header() {
  const [showNotificationIcon, setShowNotificationIcon] = useState(true);
  const [renderSettings, setRenderSettings] = useState(false);
  const [renderNotifications, setRenderNotifications] = useState(false);

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

      <ul id='user'>
        <Link to={{
          pathname: '/profile/alex_doe',
          state: { fromNewsFeed: true }
        }} onClick={() => registerClick("Clicked on Alex Doe's", "profile link to visit their profile page", 'Header')}>
          <img className='profile-pic' src={getProfilePic("alex_doe")} />
          <li id='username' className='header-text'>  Alex</li>
        </Link>

        <Link to={{
          pathname: '/',
          state: { fromNewsFeed: true }
        }} onClick={() => registerClick('Clicked on the Home Button', 'to go to the NewsFeed', 'Header')}>
          <li className='header-text'>Home</li>
        </Link>

        <li className='header-text' data-tip="Not Implemented">Create</li>

        <li className='header-text' data-tip="Not Implemented">
          <img className='profile-pic' src={find_friends} />
        </li>

        <li className='header-text' data-tip="Not Implemented">
          <img className='profile-pic' src={messages} />
        </li>

        <li className='header-text'>
          <Button onClick={onClickNotifications}>
            <img className='profile-pic' src={showNotificationIcon ? notifications_unread : notifications_black} />
          </Button>
        </li>

        <li className='header-text' data-tip="Not Implemented">
          <img className='profile-pic' src={quick_help} />
        </li>

        <li className='header-text'>
          <Button onClick={onClickSettings}>
            {highlight
              ? <img className='profile-pic' src={settings_highlight} />
              : <img className='profile-pic' src={settings_black} />
            }
          </Button>
        </li>

        {renderSettings &&
          <SettingsDropdown onClick={onClickSettings} destroy={() => setRenderSettings(false)} />}

        {renderNotifications &&
          <NotificationsDropdown onClick={onClickNotifications} destroy={() => setRenderNotifications(false)} />}
      </ul>
    </header>
  );
}

export default Header;
