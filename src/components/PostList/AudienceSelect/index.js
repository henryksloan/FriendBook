import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import AudienceOption from './AudienceOption';

function AudienceSelect({ onSelect }) {
  function select(audience) {
    return () => { onSelect(audience); };
  }

  // TODO: Implement buttons that bring up new inputs, like friends except
  return (
    <div className="AudienceSelect">
      <AudienceOption audience="public" onClick={select("public")} />
      <AudienceOption audience="friends" onClick={select("friends")} />
      <AudienceOption audience="friends_except" moreButton onClick={select("friends_except")} />
      <AudienceOption audience="specific_friends" moreButton onClick={select("specific_friends")} />
      <AudienceOption audience="only_me" selected onClick={select("only_me")} />
      <AudienceOption audience="custom" moreButton onClick={select("custom")} />
    </div>
  );
}

AudienceSelect.propTypes = {
  onSelect: PropTypes.func,
};

export default AudienceSelect;
