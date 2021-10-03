import React, { useState } from 'react';

import CompletionPopup from './CompletionPopup'

function ExitExperiment() {
  const [renderCompletionPopup, setRenderCompletionPopup] = useState(false);

  let completionPopup = <CompletionPopup
    destroy={() => { setRenderCompletionPopup(false) }} />

  return (
    <div className="ExitExperiment">
      {renderCompletionPopup && completionPopup}
      <button className="finish-button" onClick={() => setRenderCompletionPopup(true)}>
        <label className="list-text">EXIT</label>
      </button>
    </div>
  );
}

export default ExitExperiment;

