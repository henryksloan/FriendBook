import React from 'react';
import AudienceOption from './AudienceOption';

import './index.css';

function AudienceSelect() {
  return (
    <div className="AudienceSelect">
      <AudienceOption audience="public" />
      <AudienceOption audience="friends" />
      <AudienceOption audience="friends_except" moreButton />
      <AudienceOption audience="specific_friends" moreButton />
      <AudienceOption audience="only_me" selected />
      <AudienceOption audience="custom" moreButton />
    </div>
  );
}

export default AudienceSelect;
