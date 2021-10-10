import React from 'react';
import PropTypes from 'prop-types';

import { getFullName, getProfilePic } from '../../../utils/profile'
import { audienceText } from '../../../utils/audience'

import './index.css';
import ProfileLink from '../../ProfileLink';
import PostText from './PostText';
import Menu, { menuLabelTypes } from '../../Menu';
import Button from '../../Button';
import Comment from './Comment';
import NewCommentArea from './NewCommentArea';

import like_icon from '../../../assets/icons/like_icon.png';
import comment_icon from '../../../assets/icons/comment_icon.png';
import share_icon from '../../../assets/icons/share_icon.png';

function Post({ name, time, audience, photo, liked, comments, content }) {
  // TODO: Tweak wordings (e.g. "Hide from timeline")
  // TODO: Add onClick functions
  // TODO: Only show actions that make sense for the post
  const menuOptions = [
    { id: 'hide', text: 'Hide post' },
    { id: 'remove_tag', text: 'Remove tag' },
    { id: 'unfollow', text: `Unfollow ${getFullName(name)}` },
    { id: 'delete', text: 'Delete' }
  ];

  return (
    <div className="Post">
      <div className="post-header">
        <img className="post-profile-pic" src={getProfilePic(name)} />
        <div className="post-header-text">
          <ProfileLink name={name} />
          <p className="post-time">{time}</p>
          {" · "}
          <p style={{ display: "inline" }}>{audienceText(audience)}</p>
        </div>
        <Menu labelType={menuLabelTypes.HORIZONTAL_DOTS} options={menuOptions} />
      </div>

      <PostText>{content}</PostText>
      {photo && <img src={process.env.PUBLIC_URL + photo} width="100%" height="100%"></img>}

      <hr />
      <div className="post-actions">
        <Button><img src={like_icon} /> {liked ? "Unlike" : "Like"}</Button>
        <Button><img src={comment_icon} /> Comment</Button>
        <Button><img src={share_icon} /> Share</Button>
      </div>
      <hr />

      {comments && comments.map((comment, i) => <Comment key={i} {...comment} />)}
      <NewCommentArea type="post" />
    </div>
  );
}

Post.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string,
  audience: PropTypes.string,
  photo: PropTypes.string,
  liked: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.string
};

export default Post;
