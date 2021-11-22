import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../../hooks/local_storage';

import './index.css';
import defaultPosts from '../../data/posts.json';
import NewPostArea from './NewPostArea';
import Post from './Post';
import Suggestion from './Suggestion';

function PostList({ forTimeline, whoseTimeline }) {
  // TODO: Either acknowledge for_user, or make different lists for different users
  const [posts, setPosts] = useLocalStorage("posts", defaultPosts);

  const [renderSuggestion, setRenderSuggestion] = useState(true);

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

  function onUpdate(index, newPost) {
    var postsCopy = [...posts];
    postsCopy[index] = newPost;
    setPosts(postsCopy);
  }

  let filterPosts = post => !forTimeline || post.name == whoseTimeline;
  return (
    <div className="PostList">
      <NewPostArea onPost={onPost} forTimeline={forTimeline} whoseTimeline={whoseTimeline} />
      {posts.filter(filterPosts).map((post, i) =>
        <Post key={posts.length - i}
          onUpdate={newPost => onUpdate(i, newPost)}
          onDelete={() => setPosts(posts.slice(0, i).concat(posts.slice(i + 1)))}
          {...post} />)}

      {renderSuggestion &&
        <Suggestion onClickClose={() => { setRenderSuggestion(false); }} />}
    </div>
  );
}

PostList.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostList;
