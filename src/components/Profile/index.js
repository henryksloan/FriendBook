import React from 'react';
import PropTypes from 'prop-types';

import { getFullName, getProfilePic } from '../../utils/profile'

import './index.css';
import PostList from '../PostList'

function Profile({ match }) {
  return (
    <div className="Profile">
      <div className="profile-header" style={{ background: "#000" }}>
        <div className="cover-photo-container">
          <img className="cover-photo" />
        </div>
        <img className="header-profile-pic" src={getProfilePic(match.params.user)} />
        <h2>{getFullName(match.params.user)}</h2>
      </div>

      <PostList />
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
