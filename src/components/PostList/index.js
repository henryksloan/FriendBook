import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import NewPostArea from './NewPostArea';
import Post from './Post';

function PostList({ forTimeline, whoseTimeline }) {
  return (
    <div className="PostList">
      <NewPostArea onPost={() => { /* TODO: Add to posts localstorage and refresh posts */ }} forTimeline={forTimeline} whoseTimeline={whoseTimeline} />
      { /* this.getPosts() */}
      <Post name="alex_doe">Hello, World!</Post>
    </div>
  );
}

PostList.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostList;
