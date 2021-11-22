import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import Popup from '../Popup'


function ExitExperiment() {
  let location = useLocation();
  let session_id = new URLSearchParams(location.search).get("session_id");
  let condition = new URLSearchParams(location.search).get("condition");

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

  // let completionPopup = <CompletionPopup
  //   destroy={() => { setRenderCompletionPopup(false) }} />
  let completionPopup = <Popup className="incomplete-popup" title="Incomplete" onClickClose={() => setRenderCompletionPopup(false)}>
    <h3>Please continue using FriendBook for a bit longer</h3>
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

