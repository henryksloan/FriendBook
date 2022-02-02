import React, { useState } from 'react';

import Popup from '../Popup'
import Button from '../Button';

import { useLocalStorage } from '../../hooks/local_storage';

function ExitExperiment() {
  let session_id = localStorage.getItem("session_id");
  let condition = localStorage.getItem("condition");

  const [renderCompletionPopup, setRenderCompletionPopup] = useState(false);
  const [renderConfirmPopup, setRenderConfirmPopup] = useState(false);
  const [sureChecked, setSureChecked] = useState(false);
  const [hasAttemptedExit, setHasAttemptedExit] = useLocalStorage("has_attempted_exit", false);

  const time_to_exit = 60;

  function exitUrl(session_id, condition) {
    return `https://clemson.ca1.qualtrics.com/jfe/form/SV_25EacAIT7YpnukK?session_id=${session_id}&condition=${condition}`;
  }

  function exitExperiment() {
    window.location.href = exitUrl(session_id, condition);
  }

  function onClickExit() {
    let previouslyAttemptedExit = hasAttemptedExit;
    setHasAttemptedExit(true);
    let timer = localStorage.getItem("suggestion_timer");
    if (timer >= time_to_exit) {
      exitExperiment();
    } else if (previouslyAttemptedExit) {
      setRenderCompletionPopup(false);
      setRenderConfirmPopup(true);
    } else {
      setRenderCompletionPopup(true);
    }
  }

  let completionPopup = <Popup className="incomplete-popup" title="Incomplete" onClickClose={() => setRenderCompletionPopup(false)}>
    <h3>Please take some more time to review and ensure that you are okay with all the posts on FriendBook before you exit</h3>
  </Popup>

  let confirmPopup = <Popup className="incomplete-confirm-popup" title="Incomplete" onClickClose={() => { setRenderConfirmPopup(false); setSureChecked(false) }}>
    <h3>Are you sure that you are okay with all the posts on FriendBook?</h3>
    <label>
      <input type="checkbox" checked={sureChecked} onChange={() => setSureChecked(!sureChecked)} />
      I am sure
    </label>
    <div className="incomplete-confirm-buttons">
      <Button type="cancel" onClick={() => setRenderConfirmPopup(false)}>Cancel</Button>
      <Button type="confirm" isDisabled={() => !sureChecked} onClick={exitExperiment}>Exit</Button>
    </div>
  </Popup>

  return (
    <div className="ExitExperiment">
      {renderCompletionPopup && completionPopup}
      {renderConfirmPopup && confirmPopup}
      <button className="finish-button" onClick={onClickExit}>
        <label className="list-text">EXIT</label>
      </button>
    </div>
  );
}

export default ExitExperiment;

