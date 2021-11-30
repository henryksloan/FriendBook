import React, { useState } from 'react';

import Popup from '../Popup'


function ExitExperiment() {
  let session_id = localStorage.getItem("session_id");
  let condition = localStorage.getItem("condition");

  const [renderCompletionPopup, setRenderCompletionPopup] = useState(false);

  const time_to_exit = 130;

  function exitUrl(session_id, condition) {
    return `https://clemson.ca1.qualtrics.com/jfe/form/SV_25EacAIT7YpnukK?session_id=${session_id}&condition=${condition}`;
  }

  function onClickExit() {
    let timer = localStorage.getItem("suggestion_timer");
    if (timer >= time_to_exit) {
      window.location.href = exitUrl(session_id, condition);
    } else {
      setRenderCompletionPopup(true);
    }
  }

  let completionPopup = <Popup className="incomplete-popup" title="Incomplete" onClickClose={() => setRenderCompletionPopup(false)}>
    <h3>Please take some more time to review and ensure that you are okay with all the posts on FriendBook before you Exit</h3>
  </Popup>

  return (
    <div className="ExitExperiment">
      {renderCompletionPopup && completionPopup}
      <button className="finish-button" onClick={onClickExit}>
        <label className="list-text">EXIT</label>
      </button>
    </div>
  );
}

export default ExitExperiment;

