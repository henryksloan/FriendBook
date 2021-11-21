import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import { getProfilePic } from '../../../utils/profile'
import Button from '../../Button';

function EditPost({ editPostText, setEditPostText, initialEditPostText, onClickSave }) {
  // TODO: Possibly include audience selection here?
  return (
    <div className="EditPost">
      <div className="edit-post-header">
        <img className="post-profile-pic" src={getProfilePic("alex_doe")} />
        <span className="edit-post-name">Alex Doe</span>
      </div>
      <textarea rows='4' placeholder="What's on your mind, Alex?" value={editPostText} onChange={(e) => setEditPostText(e.target.value)} />

      <Button isDisabled={() => editPostText == initialEditPostText} className="edit-post-save" type="confirm" onClick={onClickSave}>Save</Button>
    </div>
  );
}

EditPost.propTypes = {
  editPostText: PropTypes.string,
  setEditPostText: PropTypes.func,
  initialEditPostText: PropTypes.string,
  onClickSave: PropTypes.func,
};

export default EditPost;
