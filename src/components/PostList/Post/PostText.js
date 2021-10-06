import React from 'react';
import PropTypes from 'prop-types';

import { replaceNamesWithLinks } from '../../../utils/profile';

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
