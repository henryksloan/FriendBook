import React, { useState } from 'react';

import './index.css';
import { getProfilePic } from '../../../utils/profile'
import Button from '../../Button';

function EditPost() {
  const [postText, setPostText] = useState("");

  // TODO: Possibly include audience selection here?
  return (
    <div className="EditPost">
      <div className="edit-post-header">
        <img className="post-profile-pic" src={getProfilePic("alex_doe")} />
        <span className="edit-post-name">Alex Doe</span>
      </div>
      <textarea rows='6' placeholder="What's on your mind, Alex?" value={postText} onChange={(e) => setPostText(e.target.value)} />

      <Button className="edit-post-save" type="confirm" onClick={() => {/*TODO*/ }}>Save</Button>
    </div>
  );
}

// EditPost.propTypes = {
// };

export default EditPost;
