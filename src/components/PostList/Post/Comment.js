import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getProfilePic, replaceNamesWithLinks } from '../../../utils/profile'
import ProfileLink from '../../ProfileLink';
import Button from '../../Button';
import NewCommentArea from './NewCommentArea';

function Comment({ name, liked, content, onUpdate, onReply, onDelete }) {
  const [renderReplyArea, setRenderReplyArea] = useState(false);

  function onSubmitReply(comment) {
    setRenderReplyArea(false);
    if (onReply) {
      onReply(comment);
    }
  }

  function onClickLike() {
    if (onUpdate) {
      onUpdate(comment => comment.liked = !comment.liked);
    }
  }

  return (
    <div className="Comment">
      <img className='comment-profile-pic' src={getProfilePic(name)} />
      <div className='comment-content'>
        <ProfileLink name={name} />
        <p>{' '}{replaceNamesWithLinks(content)}</p>
        <div className='comment-actions'>
          <Button onClick={onClickLike}>{liked ? "Unlike" : "Like"}</Button>
          <Button onClick={() => setRenderReplyArea(true)}>Reply</Button>
          {(name == 'alex_doe') && <Button onClick={() => onDelete && onDelete()}>Delete</Button>}
        </div>
      </div>
      {renderReplyArea && <NewCommentArea replyTo={name}
        onSubmit={onSubmitReply} />}
    </div>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  content: PropTypes.string,
  onUpdate: PropTypes.func,
  onReply: PropTypes.func,
  onDelete: PropTypes.func
};

export default Comment;
