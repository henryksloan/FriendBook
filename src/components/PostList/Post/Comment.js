import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getProfilePic, replaceNamesWithLinks } from '../../../utils/profile'
import ProfileLink from '../../ProfileLink';
import Button from '../../Button';
import NewCommentArea from './NewCommentArea';

function Comment({ name, liked, children }) {
  const [renderReplyArea, setRenderReplyArea] = useState(false);

  // TODO: Implement button actions
  return (
    <div className="Comment">
      <img id='comment-profile-pic' src={getProfilePic(name)} />
      <div id='comment-content'>
        <span id="comment-name"><ProfileLink name={name} /></span>
        <p>{' '}{replaceNamesWithLinks(children)}</p>
        <div id='comment-actions'>
          <Button onClick={() => { } /*this.onClickLike*/}>{liked ? "Unlike" : "Like"}</Button>
          <span id='comment-actions-dot'>·</span>
          <Button onClick={() => setRenderReplyArea(true)}>Reply</Button>
          {(name != 'alex_doe') && (
            <template>
              <span id='comment-actions-dot'>·</span>
              <Button onClick={() => { } /*this.onClickDelete*/}>Reply</Button>
            </template>
          )}
        </div>
      </div>
      {renderReplyArea && <NewCommentArea />}
    </div>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  children: PropTypes.node
};

export default Comment;
