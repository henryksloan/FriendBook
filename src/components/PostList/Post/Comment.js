import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getProfilePic, replaceNamesWithLinks } from '../../../utils/profile'
import ProfileLink from '../../ProfileLink';
import Button from '../../Button';
import NewCommentArea from './NewCommentArea';

function Comment({ name, liked, content }) {
  const [renderReplyArea, setRenderReplyArea] = useState(false);

  // TODO: Implement button actions
  return (
    <div className="Comment">
      <img className='comment-profile-pic' src={getProfilePic(name)} />
      <div className='comment-content'>
        <ProfileLink name={name} />
        <p>{' '}{replaceNamesWithLinks(content)}</p>
        <div className='comment-actions'>
          <Button onClick={() => { } /*this.onClickLike*/}>{liked ? "Unlike" : "Like"}</Button>
          <Button onClick={() => setRenderReplyArea(true)}>Reply</Button>
          {(name == 'alex_doe') && <Button onClick={() => { } /*this.onClickDelete*/}>Delete</Button>}
        </div>
      </div>
      {renderReplyArea && <NewCommentArea type="reply" />}
    </div>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  content: PropTypes.string
};

export default Comment;
