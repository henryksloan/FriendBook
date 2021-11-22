import React, { useState, useEffect } from 'react';
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

  const [suggestionTimer, setSuggestionTimer] = useLocalStorage("suggestion_timer", 0);
  const [whichSuggestion, setWhichSuggestion] = useState(0);

  // A boolean array of posts that the user has manaully modified in any way
  // Blocks suggestions
  const [postsModified, setPostsModified] = useLocalStorage("posts_modified", Array(10).fill(false));
  // Don't show suggestions that have been accepted or dismissed
  const [suggestionsDismissed, setSuggestionsDismissed] = useLocalStorage("suggestions_dismissed", Array(10).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionTimer(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function suggestIfValid(suggestionNum) {
      // If the user has modified the post in any way, or already dismissed
      // the suggestion, don't show the suggestion
      if (!postsModified[suggestionNum - 1] && !suggestionsDismissed[suggestionNum - 1]) {
        setWhichSuggestion(suggestionNum);
      }
    }

    if (20 <= suggestionTimer && suggestionTimer <= 70) {
      suggestIfValid(1);
    } else if (80 <= suggestionTimer && suggestionTimer <= 130) {
      suggestIfValid(7);
    } else if (140 <= suggestionTimer && suggestionTimer <= 190) {
      suggestIfValid(10);
    } else {
      suggestIfValid(0); // No suggestion by default
    }
  }, [suggestionTimer]);

  function dismissSuggestion(suggestionNum) {
    let newDismissed = [...suggestionsDismissed];
    newDismissed[suggestionNum - 1] = true;
    setSuggestionsDismissed(newDismissed);
  }

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

  function registerAction(post_id, action, details) {
    console.log(post_id, action, details);

    const parsedPostId = parseInt(post_id);
    if (!isNaN(parsedPostId)) {
      let newPostsModified = [...postsModified];
      newPostsModified[post_id - 1] = true;
      setPostsModified(newPostsModified);
    }

    if (details) {
      // TODO
    }
  }

  function getPostContent(suggestionNum) {
    let post = posts.find(post => post.post_id == suggestionNum);
    return post ? { postText: post.content, postPhoto: post.photo } : {};
  }

  let filterPosts = post => !forTimeline || post.name == whoseTimeline;
  return (
    <div className="PostList">
      <NewPostArea onPost={onPost} forTimeline={forTimeline} whoseTimeline={whoseTimeline} />
      {posts.filter(filterPosts).map((post, i) =>
        <Post key={posts.length - i}
          onUpdate={newPost => onUpdate(i, newPost)}
          onDelete={() => setPosts(posts.slice(0, i).concat(posts.slice(i + 1)))}
          registerAction={registerAction}
          {...post} />)}

      {(whichSuggestion != 0) &&
        <Suggestion
          whichSuggestion={whichSuggestion}
          {...getPostContent(whichSuggestion)}
          onClickClose={() => { dismissSuggestion(whichSuggestion); setWhichSuggestion(0); }}
          onClickOkay={() => { /* TODO */ dismissSuggestion(whichSuggestion); setWhichSuggestion(0); }}
        />}
    </div>
  );
}

PostList.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostList;
