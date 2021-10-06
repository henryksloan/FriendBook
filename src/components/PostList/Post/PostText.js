import React from 'react';
import PropTypes from 'prop-types';

import { replaceNamesWithLinks } from '../../../utils/profile';

function PostText({ children, userTagRemoved }) {
  return (
    <p className="PostText">
      {replaceNamesWithLinks(children, userTagRemoved)}
    </p>
  );
}

PostText.propTypes = {
  children: PropTypes.node,
  userTagRemoved: PropTypes.bool,
};

export default PostText;
