import React from 'react';
import PropTypes from 'prop-types';

import { allFullNames } from '../../../utils/profile';

function replaceNamesWithLinks(text, excludeUser = false) {
  // TODO: Implement
  if (excludeUser) {
    console.log(allFullNames);
    return text;
  } else {
    return text;
  }
}

function PostText({ children, userTagRemoved }) {
  return (
    <div className="PostText">
      {replaceNamesWithLinks(children, userTagRemoved)}
    </div>
  );
}

PostText.propTypes = {
  children: PropTypes.node,
  userTagRemoved: PropTypes.bool,
};

export default PostText;
