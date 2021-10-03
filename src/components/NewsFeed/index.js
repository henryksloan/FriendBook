import React from 'react';
import { Link } from 'react-router-dom'

import './index.css';
import PostArea from './PostArea'
import ProfileLink from '../ProfileLink'

import alex_profile_img from '../../assets/users/alex_profile_img.jpg';
import news_feed_icon from '../../assets/icons/news_feed.jpg';

function NewsFeed() {
  function registerClick() {
    // registerEvent("Clicked on Alex Doe'\s profile link", "to visit their profile page", " From NewsFeed-LeftSide");
  }

  return (
    <div className="NewsFeed">
      <ul id='left-navigation'>
        <li>
          <img className='profile-pic' src={alex_profile_img} />
          <ProfileLink name='Alex Doe' fromNewsFeed={true} onClick={registerClick} />
        </li>

        <li>
          <img className='profile-pic' src={news_feed_icon} />
          <Link to='/'> <span className="left-navigation-text">News Feed</span></Link>
        </li>
      </ul>
      <PostArea />
    </div>
  );
}

export default NewsFeed;
