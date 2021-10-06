import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import AudienceMenu from '../AudienceMenu';

function NewPostArea({ onPost, forTimeline, whoseTimeline }) {
  /* eslint-disable no-unused-vars */
  const [renderUploadPopup, setRenderUploadPopup] = useState(false);
  const [photo, setPhoto] = useState("");
  const [postText, setPostText] = useState("");
  /* eslint-enable no-unused-vars */

  function onClickPost() {
    // TODO: Adaptation stuff
    onPost();
  }

  const placeholder = (forTimeline && whoseTimeline != "Alex Doe")
    ? `Write something to ${this.props.name.split(" ")[0]}`
    : "What's on your mind, Alex?";

  // TODO: Add custom friends lists as audience options
  // TODO: Consider whether some audience options should be under "More" or "See all" (highlight accordingly)
  return (
    <div className="NewPostArea">
      <div id='new-post-area-content'>
        <textarea rows='6' placeholder={placeholder} value={postText} onChange={(e) => setPostText(e.target.value)} />
        {photo &&
          <img src={this.state.photo}
            style={{ width: 60, height: 60 }} />}
        <hr />
        <div id='new-post-actions'>
          <Button type="confirm" onClick={onClickPost}>Post</Button>
          <Button type="cancel" onClick={() => { setRenderUploadPopup(true) }}>Photo/Video</Button>
          {<AudienceMenu id="new-post-audience-menu" title="Who should see this?"
            options={["public", "friends", "friends_except", "only_me"]} />}
        </div>
        {/* this.state.renderUploadPopup && uploadPopup */}
      </div>

      {/*The Automation Adaptation Popup*/
        // TODO: Implement these
        /* this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action={this.state.action} context={this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto={this.onClickUndo_Auto}
        /> */
      }

      {  /*The Suggestion Adaptation*/
        /* this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action} context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy={this.onClickDestroySuggestion} /> */
      }
    </div>
  );
}

NewPostArea.propTypes = {
  onPost: PropTypes.func.isRequired,
  forTimeline: PropTypes.bool,
  whoseTimeline: PropTypes.string,
};

export default NewPostArea;