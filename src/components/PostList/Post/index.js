import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
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
import edit_icon from '../../../assets/icons/edit_icon.png';
import change_audience_icon from '../../../assets/icons/change_audience_icon.png';
import delete_icon from '../../../assets/icons/delete_icon.png';
import AudienceSelect from '../AudienceSelect';
import EditPost from '../EditPost';

const Post = forwardRef(({ name, time, audience, photo, liked, comments, content, post_id, onUpdate, onDelete, registerAction }, ref) => {
  const inputRef = useRef(null);
  const [renderChangeAudiencePopup, setRenderChangeAudiencePopup] = useState(false);
  const [renderEditPostPopup, setRenderEditPostPopup] = useState(false);
  const [renderConfirmDeletePopup, setRenderConfirmDeletePopup] = useState(false);

  const [editPostText, setEditPostText] = useState("");
  const [initialEditPostText, setInitialEditPostText] = useState("");

  useImperativeHandle(ref, () => ({
    changeAudience() {
      setRenderChangeAudiencePopup(true);
    },
    editPost() {
      setRenderEditPostPopup(true);
    },
    deletePost() {
      setRenderConfirmDeletePopup(true);
    }
  }), [post_id, renderChangeAudiencePopup]);

  function anyPopup() {
    return renderChangeAudiencePopup || renderEditPostPopup || renderConfirmDeletePopup;
  }

  function getPostObject() {
    return { post_id, name, time, audience, photo, liked, comments, content };
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

  // TODO: Database registers for each of these
  function editPost() {
    setRenderEditPostPopup(false);
    let details = `"${initialEditPostText}" => "${editPostText}"`;
    registerAction(post_id, "edit", details);
    updatePost(post => post.content = editPostText);
  }

  function selectAudience(newAudience) {
    setRenderChangeAudiencePopup(false);
    let details = `"${audience}" => "${newAudience}"`;
    registerAction(post_id, "change_audience", details);
    updatePost(post => post.audience = newAudience);
  }

  function deletePost() {
    if (onDelete) {
      setRenderConfirmDeletePopup(false);
      let postIdCopy = `${post_id}`;
      registerAction(postIdCopy, "delete");
      onDelete();
    }
  }

  const editOption = {
    id: 'edit', text: 'Edit post', onClick: () => {
      setEditPostText(content);
      setInitialEditPostText(content);
      setRenderEditPostPopup(true)
    }
  };
  const editAudienceOption = { id: 'edit_audience', text: 'Edit audience', onClick: () => { setRenderChangeAudiencePopup(true); } };
  const deleteOption = { id: 'delete', text: 'Move to trash', subtext: 'Items in your trash are deleted after 30 days.', onClick: () => { setRenderConfirmDeletePopup(true); } };

  // const isUser = (name == 'alex_doe');
  // const menuOptions = isUser ? [hideOption, deleteOption] : [hideOption, unfollowOption];
  const menuOptions = [editOption, editAudienceOption, deleteOption];
  const menuIcons = [edit_icon, change_audience_icon, delete_icon];
  // if (!isUser && content.includes(getFullName('alex_doe'))) {
  //   menuOptions.splice(1, 0, removeTagOption);
  // }

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
        <Menu labelType={menuLabelTypes.HORIZONTAL_DOTS} options={menuOptions} icons={menuIcons} width="300px" />
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
          <AudienceSelect audience={audience} onSelect={selectAudience} />
        </Popup>}

      {renderEditPostPopup &&
        <Popup title="Edit post" onClickClose={() => setRenderEditPostPopup(false)}>
          <EditPost editPostText={editPostText} setEditPostText={setEditPostText} initialEditPostText={initialEditPostText}
            onClickSave={editPost} />
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
});

Post.displayName = 'Post';

Post.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string,
  audience: PropTypes.string,
  photo: PropTypes.string,
  liked: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.string,
  post_id: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  registerAction: PropTypes.func,
};

export default Post;
