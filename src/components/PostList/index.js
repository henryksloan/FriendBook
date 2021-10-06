import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import NewPostArea from './NewPostArea';

function PostList({ forTimeline, whoseTimeline }) {
  return (
    <div className="PostList">
      <NewPostArea onPost={() => { /* TODO: Add to posts localstorage and refresh posts */ }} forTimeline={forTimeline} whoseTimeline={whoseTimeline} />
      { /* this.getPosts() */}
    </div>
  );
}

PostList.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostList;
