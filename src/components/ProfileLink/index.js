import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { nameToLink } from '../../utils/name_links'

function ProfileLink({ name, fromNewsFeed, onClick }) {
  return (
    <Link to={{
      pathname: `/profile/${nameToLink(name)}`,
      state: { fromNewsFeed }
    }} onClick={onClick !== undefined ? onClick : null}>
      <span className="ProfileLink" id="left-navigation-profile-name">{name}</span>
    </Link>
  );
}

ProfileLink.propTypes = {
  name: PropTypes.string.isRequired,
  fromNewsFeed: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default ProfileLink;
