import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import AudienceOption from './AudienceOption';

function AudienceSelect({ onSelect }) {
  // TODO: Implement buttons that bring up new inputs, like friends except
  return (
    <div className="AudienceSelect">
      <AudienceOption audience="public" onClick={() => { onSelect("public") }} />
      <AudienceOption audience="friends" onClick={() => { onSelect("friends") }} />
      <AudienceOption audience="friends_except" moreButton onClick={() => { onSelect("friends_except") }} />
      <AudienceOption audience="specific_friends" moreButton onClick={() => { onSelect("specific_friends") }} />
      <AudienceOption audience="only_me" selected onClick={() => { onSelect("only_me") }} />
      <AudienceOption audience="custom" moreButton onClick={() => { onSelect("custom") }} />
    </div>
  );
}

AudienceSelect.propTypes = {
  onSelect: PropTypes.func,
};

export default AudienceSelect;
