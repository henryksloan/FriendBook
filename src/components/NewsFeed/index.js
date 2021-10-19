import React from 'react';
import { Link } from 'react-router-dom'

import { getProfilePic } from '../../utils/profile';
import { cloudFunctionTest } from '../../api/test';

import './index.css';
import PostList from '../PostList'
import ProfileLink from '../ProfileLink'

import news_feed_icon from '../../assets/icons/news_feed.jpg';

function NewsFeed() {
  // TODO
  function registerClick() {
    // registerEvent("Clicked on Alex Doe'\s profile link", "to visit their profile page", " From NewsFeed-LeftSide");
    cloudFunctionTest();
  }

  return (
    <div className="NewsFeed">
      <ul id='left-navigation'>
        <li>
          <img className='profile-pic' src={getProfilePic("alex_doe")} />
          <ProfileLink name='alex_doe' fromNewsFeed={true} onClick={registerClick} />
        </li>

        <li>
          <img className='profile-pic' src={news_feed_icon} />
          <Link to='/'> <span className="left-navigation-text">News Feed</span></Link>
        </li>
      </ul>
      <PostList />
    </div>
  );
}

export default NewsFeed;
