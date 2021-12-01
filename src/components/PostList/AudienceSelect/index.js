import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import AudienceOption from './AudienceOption';

function AudienceSelect({ onSelect, audience }) {
  function select(audience) {
    return () => { onSelect(audience); };
  }

  function makeOption(audienceOption, moreButton = false) {
    return <AudienceOption
      audience={audienceOption}
      moreButton={moreButton}
      selected={audience == audienceOption}
      onClick={select(audienceOption)} />;
  }

  // TODO: Implement buttons that bring up new inputs, like friends except
  return (
    <div className="AudienceSelect">
      {makeOption("public")}
      {makeOption("friends")}
      {makeOption("friends_except", true)}
      {makeOption("specific_friends", true)}
      {makeOption("only_me")}
      {makeOption("custom")}
    </div>
  );
}

AudienceSelect.propTypes = {
  onSelect: PropTypes.func,
  audience: PropTypes.string,
};

export default AudienceSelect;
