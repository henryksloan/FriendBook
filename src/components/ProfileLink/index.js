import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getFullName } from '../../utils/profile';

function ProfileLink({ name, fromNewsFeed, onClick }) {
  return (
    <Link className="ProfileLink"
      to={{
        pathname: `/profile/${name}`,
        state: { fromNewsFeed }
      }} onClick={onClick !== undefined ? onClick : null}
    >
      <span id="left-navigation-profile-name">{getFullName(name)}</span>
    </Link>
  );
}

ProfileLink.propTypes = {
  name: PropTypes.string.isRequired,
  fromNewsFeed: PropTypes.bool,
  onClick: PropTypes.func
};

export default ProfileLink;
