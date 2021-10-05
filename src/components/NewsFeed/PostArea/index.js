import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import NewPostArea from './NewPostArea';

function PostArea({ forTimeline, whoseTimeline }) {
  return (
    <div className="PostArea">
      <NewPostArea onPost={() => { /* TODO: Add to posts localstorage and refresh posts */ }} forTimeline={forTimeline} whoseTimeline={whoseTimeline} />
      { /* this.getPosts() */}
    </div>
  );
}

PostArea.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostArea;
