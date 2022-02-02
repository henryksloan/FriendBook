import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../../hooks/local_storage';

import './index.css';
import defaultPosts from '../../data/posts.json';
import NewPostArea from './NewPostArea';
import Post from './Post';
import Suggestion from './Suggestion';

import suggestions from '../../data/tone.json';
import { registerAction } from '../../api';

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

  const postsRef = useRef([]);
  useEffect(() => {
    postsRef.current = postsRef.current.slice(0, posts.length);
  }, [posts]);

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
        if (whichSuggestion == 0) {
          let suggestion = suggestions.find(obj => parseInt(obj.post_id) == suggestionNum);
          registerAction(suggestionNum, "show", "", true, suggestion && suggestion.action);
          setWhichSuggestion(suggestionNum);
        }
      }
    }

    if (40 <= suggestionTimer && suggestionTimer <= 55) {
      suggestIfValid(1);
    } else if (70 <= suggestionTimer && suggestionTimer <= 85) {
      suggestIfValid(7);
    } else if (100 <= suggestionTimer && suggestionTimer <= 115) {
      suggestIfValid(10);
    } else {
      setWhichSuggestion(0); // No suggestion by default
    }
  }, [suggestionTimer, whichSuggestion]);

  function dismissSuggestion(suggestionNum) {
    let newDismissed = [...suggestionsDismissed];
    newDismissed[suggestionNum - 1] = true;
    setSuggestionsDismissed(newDismissed);
  }

  function rejectSuggestion(suggestionNum) {
    dismissSuggestion(suggestionNum);
    let suggestion = suggestions.find(obj => parseInt(obj.post_id) == suggestionNum);
    registerAction(suggestionNum, "reject", "", true, suggestion && suggestion.action);
  }

  function acceptSuggestion(suggestionNum) {
    dismissSuggestion(suggestionNum);
    let suggestion = suggestions.find(obj => parseInt(obj.post_id) == suggestionNum);
    registerAction(suggestionNum, "accept", "", true, suggestion && suggestion.action);

    if (!suggestion) return;

    let postIndex = posts.findIndex(post => post.post_id == suggestionNum);
    if (postIndex >= 0) {
      const postRef = postsRef.current[postIndex];
      if (!postRef) return;
      switch (suggestion.action) {
        case 'change_audience':
          postsRef.current[postIndex].changeAudience();
          break;
        case 'edit_post':
          postsRef.current[postIndex].editPost();
          break;
        case 'delete_post':
          postsRef.current[postIndex].deletePost();
          break;
      }
    }
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

  function registerPostAction(post_id, action, details) {
    console.log(post_id, action, details);

    const parsedPostId = parseInt(post_id);
    if (!isNaN(parsedPostId)) {
      let newPostsModified = [...postsModified];
      newPostsModified[post_id - 1] = true;
      setPostsModified(newPostsModified);
    }

    registerAction(post_id, action, details);
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
          ref={el => postsRef.current[i] = el}
          onUpdate={newPost => onUpdate(i, newPost)}
          onDelete={() => setPosts(posts.slice(0, i).concat(posts.slice(i + 1)))}
          registerAction={registerPostAction}
          {...post} />)}

      {(whichSuggestion != 0) &&
        <Suggestion
          whichSuggestion={whichSuggestion}
          {...getPostContent(whichSuggestion)}
          onClickClose={() => { rejectSuggestion(whichSuggestion); setWhichSuggestion(0); }}
          onClickOkay={() => { acceptSuggestion(whichSuggestion); setWhichSuggestion(0); }}
        />}
    </div>
  );
}

PostList.propTypes = {
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default PostList;
