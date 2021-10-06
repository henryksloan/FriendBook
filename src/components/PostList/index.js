import React from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../../hooks/local_storage';

import './index.css';
import NewPostArea from './NewPostArea';
import Post from './Post';

function PostList({ forTimeline, whoseTimeline }) {
  const [posts, setPosts] = useLocalStorage("posts", []);

  function onPost(content, photo, audience) {
    // TODO: Adaptation stuff
    let newPosts = [...posts];
    var newPost = {
      name: 'alex_doe',
      content,
      photo,
      comments: [],
      audience,
      time: "Just now"
    };
    newPosts.unshift(newPost);
    setPosts(newPosts);
  }

  return (
    <div className="PostList">
      <NewPostArea onPost={onPost} forTimeline={forTimeline} whoseTimeline={whoseTimeline} />
      {posts.map((post, i) => <Post key={i} {...post} />)}
      <Post name="alex_doe" time="Just now" audience="Public" content="test" />
    </div>
  );
}

PostList.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostList;
