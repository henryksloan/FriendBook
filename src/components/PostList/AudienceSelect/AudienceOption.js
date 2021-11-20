import React from 'react';
import PropTypes from 'prop-types';

import { audienceText, audienceListItemText, audienceIcon } from '../../../utils/audience'

function AudienceOption({ audience }) {
  let audience_list_item = audienceListItemText(audience);
  let explanation = audience_list_item ? audience_list_item[1] : "";
  return (
    <div className="AudienceOption">
      <div className="audience-option-icon-container">
        <div className="audience-option-icon-circle">
          <img className="audience-option-icon" src={audienceIcon(audience)} />
        </div>
      </div>

      <div className="audience-option-text">
        <h3>{audienceText(audience)}</h3>
        <p>{explanation}</p>
      </div>
    </div>
  );
}

AudienceOption.propTypes = {
  audience: PropTypes.string.isRequired,
};

export default AudienceOption;
