import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { /* getFullName, */ getProfilePic } from '../../../utils/profile'
import { audienceIcon, audienceText } from '../../../utils/audience'

import './index.css';
import ProfileLink from '../../ProfileLink';
import PostText from './PostText';
import Popup from '../../Popup';
import Menu, { menuLabelTypes } from '../../Menu';
import Button from '../../Button';
import Comment from './Comment';
import NewCommentArea from './NewCommentArea';

import like_icon from '../../../assets/icons/like_icon.png';
import comment_icon from '../../../assets/icons/comment_icon.png';
import share_icon from '../../../assets/icons/share_icon.png';
import AudienceSelect from '../AudienceSelect';

function Post({ name, time, audience, photo, liked, comments, content, onUpdate, onDelete }) {
  const inputRef = useRef(null);
  const [renderChangeAudiencePopup, setRenderChangeAudiencePopup] = useState(false);
  const [renderEditPostPopup, setRenderEditPostPopup] = useState(false);
  const [renderConfirmDeletePopup, setRenderConfirmDeletePopup] = useState(false);

  function anyPopup() {
    return renderChangeAudiencePopup || renderEditPostPopup || renderConfirmDeletePopup;
  }

  function getPostObject() {
    return { name, time, audience, photo, liked, comments, content };
  }

  function updatePost(updateFunc) {
    var postObj = getPostObject();
    if (updateFunc) {
      updateFunc(postObj);
    }
    if (onUpdate) {
      onUpdate(postObj);
    }
  }

  function deletePost() {
    if (onDelete) {
      setRenderConfirmDeletePopup(false);
      onDelete();
    }
  }

  const editOption = { id: 'edit', text: 'Edit post', onClick: () => { setRenderEditPostPopup() } }; // TODO: Implement editing
  const editAudienceOption = { id: 'edit_audience', text: 'Edit audience', onClick: () => { setRenderChangeAudiencePopup(true); } };
  const deleteOption = { id: 'delete', text: 'Move to trash', onClick: () => { setRenderConfirmDeletePopup(true); } };

  // const isUser = (name == 'alex_doe');
  // const menuOptions = isUser ? [hideOption, deleteOption] : [hideOption, unfollowOption];
  const menuOptions = [editOption, editAudienceOption, deleteOption];
  // if (!isUser && content.includes(getFullName('alex_doe'))) {
  //   menuOptions.splice(1, 0, removeTagOption);
  // }

  let selectAudience = (audience) => { setRenderChangeAudiencePopup(false); updatePost(post => post.audience = audience); };

  // TODO: Implement sharing
  // TODO: Implement target_friend
  return (
    <div className="Post">
      <div className="post-header">
        <img className="post-profile-pic" src={getProfilePic(name)} />
        <div className="post-header-text">
          <ProfileLink name={name} />
          <p className="post-time">{time}</p>
          {" · "}
          <img className="audience-icon" src={audienceIcon(audience)} title={audienceText(audience)} onClick={() => setRenderChangeAudiencePopup(true)} />
        </div>
        <Menu labelType={menuLabelTypes.HORIZONTAL_DOTS} options={menuOptions} />
      </div>

      <PostText>{content}</PostText>
      {photo && <img src={process.env.PUBLIC_URL + photo} width="100%" height="100%"></img>}

      <hr />
      <div className="post-actions">
        <Button onClick={() => updatePost(post => post.liked = !post.liked)}>
          {" "}<img src={like_icon} /> {liked ? "Unlike" : "Like"}
        </Button>
        <Button onClick={() => inputRef && inputRef.current.focus()}><img src={comment_icon} /> Comment</Button>
        <Button><img src={share_icon} /> Share</Button>
      </div>
      <hr />

      {comments && comments.map((comment, i) =>
        <Comment key={i}
          onUpdate={updateFunc => updatePost(post => updateFunc(post.comments[i]))}
          onReply={comment => updatePost(post => post.comments.push(comment))}
          onDelete={() => updatePost(post => post.comments = comments.slice(0, i).concat(comments.slice(i + 1)))}
          {...comment} />)}
      <NewCommentArea inputRef={inputRef}
        onSubmit={comment => updatePost(post => post.comments.push(comment))} />

      {anyPopup() && <div className="popup-backdrop" />}

      {renderChangeAudiencePopup &&
        <Popup title="Select audience" onClickClose={() => setRenderChangeAudiencePopup(false)}>
          <AudienceSelect onSelect={selectAudience} />
        </Popup>}

      {renderEditPostPopup &&
        <Popup title="Edit post" onClickClose={() => setRenderEditPostPopup(false)}>
          <AudienceSelect onSelect={selectAudience} />
        </Popup>}

      {renderConfirmDeletePopup &&
        <Popup title="Move to Your Trash?" onClickClose={() => setRenderConfirmDeletePopup(false)}>
          <div className="confirm-delete-popup">
            <p>Items in your trash will be automatically deleted after 30 days. You can delete them earlier from your Trash by going to Activity Log in Settings.</p>
            <div className="confirm-delete-buttons">
              <Button type="cancel" onClick={() => setRenderConfirmDeletePopup(false)}>Cancel</Button>
              <Button type="confirm" onClick={deletePost}>Move</Button>
            </div>
          </div>
        </Popup>}
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
  content: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Post;
