import React from 'react';
import PropTypes from 'prop-types';

import { getFullName, getProfilePic } from '../../utils/profile'

import './index.css';
import PostList from '../PostList'

function Profile({ match }) {
  return (
    <div className="Profile">
      <div className="profile-header" style={{ background: "#000" }}>
        <div className="profile-pic-name">
          <img className="header-profile-pic" src={getProfilePic(match.params.user)} />
          <h2>{getFullName(match.params.user)}</h2>
        </div>
        <div className="profile-top-bar">
          <ul className="profile-top-bar-buttons">
            <li><a href="#" data-tip="Not Implemented">Timeline</a></li>
            <li><a href="#" data-tip="Not Implemented">About</a></li>
            <li><a href="#" data-tip="Not Implemented">Friends</a></li>
            <li><a href="#" data-tip="Not Implemented">Photos</a></li>
            <li><a href="#" data-tip="Not Implemented">More</a></li>
          </ul>
        </div>
      </div>

      <PostList forTimeline whoseTimeline={match.params.user} />
    </div>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.string
    })
  }),
}

export default Profile;
