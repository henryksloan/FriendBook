import React from 'react';
import AudienceOption from './AudienceOption';

import './index.css';

function AudienceSelect() {
  return (
    <div className="AudienceSelect">
      <AudienceOption audience="public" />
      <AudienceOption audience="friends" />
      <AudienceOption audience="friends_except" />
      <AudienceOption audience="specific_friends" />
      <AudienceOption audience="only_me" />
      <AudienceOption audience="custom" />
    </div>
  );
}

export default AudienceSelect;
